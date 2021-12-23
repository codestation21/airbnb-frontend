/** @jsxImportSource theme-ui */
// Responsive Design
// Package Installation
import { useEffect, useState } from "react"
import { Container, Box, Label, Input, Paragraph, Heading, Button, Image } from "theme-ui";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// Components, media & functions
import Icons from "utilis/Icons";
import Heads from "utilis/Heads";
import Loader from "assets/Loader.svg";
import { wrapper } from "redux/store";
import { authCheck } from "redux/actions/userActions";
import { clearErrors, resetPassword } from "redux/actions/profileAction";

const NewPassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [show, setShow] = useState({
        pass: false,
        passConf: false
    });
    const password = watch("password", "");
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const { success, loading, message } = useSelector(state => state.updatePorfile);
    const dispatch = useDispatch();
    const handleShow = (value) => {
        if (value === "password") {
            setShow({
                pass: !show.pass
            })
        } else {
            setShow({
                passConf: !show.passConf
            })
        }
    }
    const onSubmit = (data, e) => {
        const token = Router.query.index
        dispatch(resetPassword(data, token))
        e.target.reset();
    };
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
                Router.push('/');
            }, 1000)
        }
    }, [dispatch, success, message])
    return (
        <Container sx={{ color: "text_primary", p: "7.5rem 0" }}>
            <Heads title="Set Password- Real State Management System" />
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
            <Box variant="FormContainer">
                <Heading variant="Title" as="h3">New Password</Heading>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box variant="FormControl">
                        <Box sx={{ position: "relative" }}>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                id="password"
                                type={show.pass ? "text" : "password"}
                                {...register(
                                    "password",
                                    {
                                        required: "You must specify a password",
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                                            message: "Password must contain at least one letter and Number!"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        },

                                    },
                                    { required: true }
                                )}
                            />
                            <Box sx={styles.Eyes} onClick={() => handleShow("password")}>
                                {!show.pass &&
                                    < Icons icon="ant-design:eye-filled" />
                                }
                                {show.pass &&
                                    <Icons icon="ant-design:eye-invisible-filled" />
                                }
                            </Box>
                        </Box>
                        {errors.password && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.password.message}
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl">
                        <Box sx={{ position: "relative" }}>
                            <Label htmlFor="password_repeat">Repeat Password</Label>
                            <Input
                                name="password_repeat"
                                type={show.passConf ? "text" : "password"}
                                id="password_repeat"
                                {...register(
                                    "password_repeat",
                                    {
                                        validate: value =>
                                            value === password || "The passwords do not match"
                                    }
                                )}
                            />
                            <Box sx={styles.Eyes} onClick={() => handleShow("passconfirm")}>
                                {!show.passConf &&
                                    < Icons icon="ant-design:eye-filled" />
                                }
                                {show.passConf &&
                                    <Icons icon="ant-design:eye-invisible-filled" />
                                }
                            </Box>
                        </Box>
                        {errors.password_repeat && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.password_repeat.message}
                            </Paragraph>
                        )}
                    </Box>
                    <Box>
                        <Button variant="SubmitButtons" type='submit'>
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="Loading" /> : "Set Password"
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default NewPassword;

// stylesheets
const styles = {
    Eyes: {
        position: "absolute",
        right: "10px",
        top: "55%",
        cursor: "pointer"
    },
    Message: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "16%",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}
// Server side data fatching
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(authCheck(context.req.cookies['token']));
            if (auth) {
                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
        }
)
