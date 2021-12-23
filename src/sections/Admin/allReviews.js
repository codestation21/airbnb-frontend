/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react";
import { Container, Box, Label, Input, Paragraph, Flex, Button } from "theme-ui";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from 'material-table';
import { useRouter } from "next/router";

import { getAdminReviews } from "redux/actions/adminAction";
import { deleteReviews, clearErrors } from "redux/actions/adminAction";
import Icons from "utilis/Icons";

const AllReviews = () => {
    const { message, reviews } = useSelector(state => state.getAdminReviews);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const Router = useRouter();
    const { success, deleteMessage } = useSelector(state => state.deleteReviews);
    const inputHandler = (e) => {
        dispatch(getAdminReviews(e.target.value));
    }
    const data = [];
    reviews && reviews.forEach(review => {
        data.push({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            user: review.user.name,
            action:
                <>
                    <Flex>
                        <Button
                            sx={styles.DownloadButton}
                            onClick={() => dispatch(deleteReviews(review.id))}
                        >
                            <Icons icon="fa-solid:trash-alt" />
                        </Button>
                    </Flex>
                </>

        })
    })
    const columns = [
        { title: 'Review ID', field: 'id' },
        { title: 'Rating', field: 'rating' },
        { title: 'Comment', field: 'comment' },
        { title: 'User', field: 'user' },
        { title: 'Action', field: 'action' }
    ];
    useEffect(() => {
        if (!success) {
            if (deleteMessage) {
                setError(true)
                setTimeout(() => {
                    setError(false)
                    dispatch(clearErrors())
                }, 5000)
            }
        } else if (success) {
            Router.push('/admin/reviews');
        }
    }, [dispatch, success])
    return (
        <Container px={"80px"} pt={"45px"}>
            <Box as="form" sx={styles.FormContainer}>
                <Box variant="FormControl">
                    <Label htmlFor="reviews">Enter Room ID</Label>
                    <Input
                        name="reviews"
                        id="rivews"
                        placeholder="6184fc741a1a730367414974"
                        sx={{ mt: "10px" }}
                        onChange={inputHandler}
                    />
                </Box>
            </Box>
            <Box sx={{ mt: "20px" }}>
                {(reviews && reviews.length === 0 || reviews === undefined) &&
                    <Paragraph sx={styles.NoReviews}>
                        {message ? (message !== "There are no review yet!" ? "Please Type a valid ID!" : message) : "No Reviews"}
                    </Paragraph>
                }
                {reviews && reviews.length > 0 &&
                    <MaterialTable
                        columns={columns}
                        data={data}
                        title={`${reviews ? reviews.length : 0} Users`}
                    />
                }
            </Box>
            {error &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#FFBABA",
                        color: "#D8000C"
                    }}
                >{deleteMessage}</Box>
            }
        </Container>
    );
};

export default AllReviews;

const styles = {
    BookingContainer: {
        ".MuiPaper-elevation2": {
            boxShadow: "none"
        },
        ".MuiTypography-h6": {
            fontSize: "2rem"
        },
        "th": {
            fontWeight: "700",
            fontSize: "18px"
        },
        ".Component-horizontalScrollContainer-12": {
            border: "1px solid #00000014",
            borderRadius: "7px"
        }
    },
    DownloadButton: {
        bg: "text_quaternary",
        px: "15px",
        borderRadius: "5px",
        color: "white",
        ml: "10px",
        cursor: "pointer"
    },
    FormContainer: {
        width: "40%",
        mx: "auto"
    },
    NoReviews: {
        background: "#f8d7da",
        color: "#721c24",
        textAlign: "center",
        py: "12px",
        fontSize: "16px",
        borderRadius: "7px",
        mt: "5em"
    },
    Message: {
        width: "max-content",
        mx: "auto",
        transform: "translateY(-55px)",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    }
}