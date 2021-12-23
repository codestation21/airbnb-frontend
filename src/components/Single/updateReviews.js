/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react";
import { Box, Button, Paragraph, Textarea, Image } from "theme-ui";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { clearErrors, updateReviews } from "redux/actions/reviewAction";
import Icons from "utilis/Icons";
import Loader from "../../assets/Loader.svg";

const UpdateReviews = () => {
    const [btnType, setBtnType] = useState("add");
    const [rating, setRating] = useState(0);
    const [ratingError, setRatingError] = useState(null);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const Router = useRouter();
    const onSubmit = (data, e) => {
        if (rating === 0) {
            setRatingError(true)
        } else {
            dispatch(updateReviews(Router.query.index, data.message, rating))
        }
    };
    const { loading, success, message } = useSelector(state => state.updateReview);
    const setUserRatings = () => {
        setBtnType("submit")
        const stars = document.querySelectorAll(".star_javascript_document");
        stars.forEach((star, index) => {
            star.starValue = index + 1;
            ['click', "mouseover", "mouseout"].forEach(function (e) {
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === "click") {
                    if (index < this.starValue) {
                        star.classList.add("red");
                        setRating(this.starValue);
                    } else {
                        star.classList.remove("red")
                    }
                }
                if (e.type === "mouseover") {
                    if (index < this.starValue) {
                        star.classList.add("light-red");
                    } else {
                        star.classList.remove("light-red")
                    }
                }
                if (e.type === "mouseout") {
                    star.classList.remove("light-red")
                }
            })
        }
    }
    useEffect(() => {
        if (rating > 0) {
            setRatingError(null)
        }
    }, [rating]);
    useEffect(() => {
        if (!success) {
            if (message) {
                setError(true)
                setTimeout(() => {
                    setError(false)
                    dispatch(clearErrors())
                }, 5000)
            }
        } else if (success) {
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
                dispatch(clearErrors())
            }, 5000)
        }
    }, [dispatch, success, message])
    return (
        <>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <Box className={btnType === "submit" ? "submit-field" : ""} sx={styles.SubmitField}>
                    <ul sx={styles.StarField}>
                        <li className="star_javascript_document"><Icons icon="ant-design:star-filled" /></li>
                        <li className="star_javascript_document"><Icons icon="ant-design:star-filled" /></li>
                        <li className="star_javascript_document"><Icons icon="ant-design:star-filled" /></li>
                        <li className="star_javascript_document"><Icons icon="ant-design:star-filled" /></li>
                        <li className="star_javascript_document"><Icons icon="ant-design:star-filled" /></li>
                    </ul>
                    {ratingError === true &&
                        <Paragraph variant="ErrorMessage">
                            <Icons icon="bx:bxs-error" />
                            Please add a rating!
                        </Paragraph>
                    }
                    <Box variant="FormControl">
                        <Textarea
                            name="message"
                            id="message"
                            sx={styles.TextArea}
                            rows={5}
                            {...register(
                                "message",
                                {
                                    required: "Please write something!",
                                    minLength: {
                                        value: 25,
                                        message: "Comment should not be less than 25 characters!",
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: "Message should not be more than 500 characters!"
                                    }
                                },
                                { required: true }
                            )}
                        />
                        {errors.message && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.message.message}
                            </Paragraph>
                        )}
                    </Box>
                </Box>
                {btnType === "submit" &&
                    <Button variant="SubmitButtons" type='submit' sx={{ width: ["100%", null, "40%", "20%", "40%", "10%"] }}>
                        {loading ?
                            <Image sx={styles.Loading} src={Loader} alt="Loading" /> : "Update"
                        }
                    </Button>
                }
            </Box>
            {btnType === "add" &&
                <Button
                    sx={styles.AddButton}
                    onClick={setUserRatings}
                >Update review</Button>
            }
            {error &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#FFBABA",
                        color: "#D8000C"
                    }}
                >{message}</Box>
            }
            {successMessage &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#DFF2BF",
                        color: "#74A53C"
                    }}
                >{message}</Box>
            }
        </>
    );
};
export default UpdateReviews;

const styles = {
    AddButton: {
        bg: "text_quaternary",
        mt: "8px",
        cursor: "pointer"
    },
    StarField: {
        my: "10px",
        p: "0",
        li: {
            display: "inline-block",
            fontSize: "30px",
            cursor: "pointer",
            mx: "3px",
            color: "#0000007d",
            "&.red": {
                color: "#ff5a5f"
            },
            "&.light-red": {
                color: "#FF5A5FC7"
            }
        }
    },
    SubmitField: {
        mt: "-10em",
        opacity: 0,
        visibility: "hidden",
        transition: "0.7s cubic-bezier(0.545, 0, 0.05, 1)",
        "&.submit-field": {
            mt: "0",
            opacity: 1,
            visibility: "visible"
        }
    },
    TextArea: {
        border: "1px solid #00000047",
        fontWeight: 500,
        fontFamily: "body",
        letterSpacing: "1px",
        mt: "15px",
        "&:focus": {
            outline: "none"
        }
    },
    Message: {
        fontSize: "16px",
        padding: "6px 5px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}