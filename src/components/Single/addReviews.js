/** @jsxImportSource theme-ui */
import { useState } from "react"
import { Container, Alert, Close } from "theme-ui";
import { useSelector } from "react-redux";

import Icons from "utilis/Icons";
import SumitReviews from "./sumitReviews";
import UpdateReviews from "./updateReviews";

const AddReviews = () => {
    const [alert, setAlert] = useState(true);
    const { isReview } = useSelector(state => state.checkReview);
    const alertHandler = () => {
        setAlert(false)
    }
    return (
        <Container pt={"30px"} pb={1}>
            {isReview && isReview.isCanUpdate === false &&
                <Alert className={alert ? "" : "hide"} sx={styles.Alert}>
                    <Icons icon="mdi:home-alert" />
                    You already book this room. Please add a review quickly!
                    <Close sx={{ cursor: 'pointer' }} onClick={alertHandler} ml="auto" mr={-2} />
                </Alert>
            }
            {isReview && isReview.isCanUpdate === true &&
                <Alert className={alert ? "" : "hide"} sx={styles.SuuccessAlert}>
                    <Icons icon="clarity:success-standard-solid" />
                    You already submit a review. You can update now!
                    <Close sx={{ cursor: 'pointer' }} onClick={alertHandler} ml="auto" mr={-2} />
                </Alert>
            }
            {isReview && isReview.isCanUpdate === false &&
                <SumitReviews />
            }
            {isReview && isReview.isCanUpdate === true &&
                <UpdateReviews />
            }
        </Container>
    );
};
export default AddReviews;

const styles = {
    Alert: {
        fontSize: ["14px", "unset"],
        "&.hide": {
            opacity: "none",
            visibility: "hidden"
        },
        svg: {
            fontSize: ["30px", "22px"],
            mr: "8px",
            mt: "-2px"
        }
    },
    SuuccessAlert: {
        bg: "#563D7C",
        "&.hide": {
            opacity: "none",
            visibility: "hidden"
        },
        svg: {
            fontSize: "22px",
            mr: "8px",
            mt: "-2px"
        }
    }
}