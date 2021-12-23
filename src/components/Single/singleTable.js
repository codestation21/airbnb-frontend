/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react";
import { Container, Box, Flex, Heading, Paragraph, Button, Text, Image } from "theme-ui";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

import getStripe from "utilis/getStripe";
import { checkBookedAvailbility, getBookedDates } from "redux/actions/bookingAction";
import Share from "./Share";
import Icons from "utilis/Icons";
import Loader from "assets/Loader.svg";

const SingleTable = () => {
    const { room } = useSelector(state => state.getRoom);
    const { isAvailable } = useSelector(state => state.checkAvailable);
    const { dates } = useSelector(state => state.bookedDates);
    const exCludedDates = [];
    dates.forEach(date => {
        exCludedDates.push(new Date(date))
    })
    const star = [];
    const starFilled = [];
    for (let i = 0; i < 5; i++) {
        star.push(<Icons key={i} icon="ic:outline-star-border" />)
    }
    for (let i = 0; i < 5; i++) {
        starFilled.push(<Icons key={i} icon="ic:outline-star" />)
    }
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [daysOfStay, setDaysOfStay] = useState();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const Router = useRouter();
    const dispatch = useDispatch();
    const dateOnchange = (dates) => {
        const [checkInDate, checkOutDate] = dates
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);
        if (checkInDate && checkOutDate) {
            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1);
            setDaysOfStay(days);
            const checkData = {
                roomId: Router.query.index,
                checkInDate: checkInDate.toISOString(),
                checkOutDate: checkOutDate.toISOString(),
            }
            dispatch(checkBookedAvailbility(checkData));
        }
    }
    const bookRoom = async (Ids, price) => {
        setPaymentLoading(true);
        const amount = price * daysOfStay;
        const token = Cookies.get('token');
        await axios.post("http://localhost:3001/graphql", {
            query: `
            mutation stripeCheckOut {
              stripeCheckOut(
                input: {
                  room: "${Ids}"
                  successUrl: "${process.env.basePath}/bookings/me"
                  calcenlUrl: "${process.env.basePath}/single/${Ids}"
                  checkInDate: "${checkInDate.toISOString()}"
                  checkOutDate: "${checkOutDate.toISOString()}"
                  daysOfStay: ${Number(daysOfStay)}
                  amountPaid: ${Number(amount)}
                }
              ){
                message
                id
              }
            }`
        }, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async (res) => {
                console.log(res);
                if (res.data.errors) {
                    setErrorMessage(res.data.errors[0].message);
                    setPaymentLoading(true);
                } else {
                    const stripe = await getStripe();
                    stripe.redirectToCheckout({ sessionId: res.data.data.stripeCheckOut.id });
                    setPaymentLoading(true);
                }
            })
            .catch(err => {
                setErrorMessage("Something went wrong!");
                setPaymentLoading(true);
            })
    }
    const id = Router.query.index;
    useEffect(() => {
        dispatch(getBookedDates(id))
    }, [dispatch, id])
    return (
        <Container>
            <Flex>
                <Box sx={{ position: "relative" }}>
                    <Box sx={{ color: "text_tartiary", fontSize: "20px" }}>{star}</Box>
                    <Box
                        sx={{
                            ...styles.Star,
                            width: `${(room.ratings / 5) * 100}%`
                        }}
                    >{starFilled}</Box>
                </Box>
                <Box sx={{ color: "text_tartiary" }}>
                    / {room.numOfReviews}
                </Box>
            </Flex>
            <Flex>
                <Heading as="h2" sx={styles.Title}>{room.name}</Heading>
                <Box sx={{ flex: "0 0 10%", textAlign: "right" }}><Share /></Box>
            </Flex>
            <Paragraph>{room.address}</Paragraph>
            <Box sx={styles.PriceBox}>
                <Heading as="h1">
                    ${room.price}
                    <Text as="span"> / night</Text>
                </Heading>
            </Box>
            <Box sx={styles.Calendar}>
                <DatePicker
                    selected={checkInDate}
                    onChange={dateOnchange}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    excludeDates={exCludedDates}
                    selectsRange
                    inline
                />
            </Box>
            {isAvailable === true &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#DFF2BF",
                        color: "#74A53C"
                    }}
                >Room is available. Book now.</Box>
            }
            {isAvailable === false &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#FFBABA",
                        color: "#D8000C"
                    }}
                >Room is not availble. Try different dates.</Box>
            }
            <Button
                variant="SubmitButtons"
                onClick={() => bookRoom(room.id, room.price)}
                className={isAvailable === true ? "" : "disable"}
                sx={styles.PayButton}
            >
                {paymentLoading ?
                    <Image sx={styles.Loading}
                        src={Loader} alt="Loading" /> : `Pay ${isAvailable === true ? `$${daysOfStay * room.price}` : " "}`
                }
            </Button>
            {errorMessage &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#FFBABA",
                        color: "#D8000C"
                    }}
                >{errorMessage}</Box>
            }
        </Container>
    );
};

export default SingleTable;

const styles = {
    Title: {
        fontSize: "20px",
        fontWeight: "medium",
        mb: "12px",
        color: "#000000a6",
        flex: "0 0 90%"
    },
    Star: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "90%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        color: "text_tartiary",
        fontSize: "20px"
    },
    PriceBox: {
        my: "20px",
        h1: {
            color: "#000000a6",
            fontSize: "28px",
            span: {
                fontSize: "24px",
                fontWeight: "medium"
            }
        }
    },
    PayButton: {
        "&.disable": {
            pointerEvents: "none",
            opacity: 0.5
        }
    },
    Calendar: {
        textAlign: "center",
        ".react-datepicker__month-container": {
            width: "100%"
        },
        ".react-datepicker": {
            width: "100%"
        },
        ".react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name": {
            margin: ["0px", "6px", "10px", "15px", "5px", "3px", "6px"]
        }
    },
    Message: {
        my: "10px",
        fontSize: "17px",
        padding: "10px 12px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}