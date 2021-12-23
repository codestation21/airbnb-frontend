/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { Button, Container, Flex, Box } from "theme-ui";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from 'material-table';

import { deleteBooking, clearErrors } from "redux/actions/adminAction";
import Icons from 'utilis/Icons';
import booking from "pages/admin/bookings";

const AllBookings = () => {
    const { bookings } = useSelector(state => state.getAdminBooking);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const dispatch = useDispatch();
    const Router = useRouter();
    const { success, loading, message } = useSelector(state => state.deleteBooking);
    const data = [];
    bookings && bookings.forEach(booking => {
        data.push({
            id: booking.id,
            checkIn: new Date(booking.checkInDate).toLocaleDateString('en-US'),
            checkOut: new Date(booking.checkOutDate).toLocaleDateString('en-US'),
            amount: booking.amountPaid,
            action:
                <>
                    <Flex>
                        <Link href={`/admin/booking/${booking.id}`}>
                            <a sx={styles.EyeButton}><Icons icon="fa-solid:eye" /></a>
                        </Link>
                        <Button
                            sx={styles.DownloadButton}
                            onClick={() => dispatch(deleteBooking(booking.id))}
                        >
                            <Icons icon="fa-solid:trash-alt" />
                        </Button>
                    </Flex>
                </>

        })
    })
    const columns = [
        { title: 'Booking ID', field: 'id' },
        { title: 'Check In', field: 'checkIn' },
        { title: 'Check Out', field: 'checkOut' },
        { title: 'Amount Paid', field: 'amount' },
        { title: 'Action', field: 'action' }
    ];
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
                Router.push('/admin/bookings');
            }, 2000)
        }
    }, [dispatch, success])
    return (
        <Container px={"80px"} pt={"45px"} sx={styles.BookingContainer}>
            <MaterialTable
                columns={columns}
                data={data}
                title={`${booking ? booking.length : 0} Bookings`}
            />
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
        </Container>
    );
};
export default AllBookings;

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
    EyeButton: {
        bg: "#007BFF",
        px: "15px",
        pt: "9px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer"
    },
    DownloadButton: {
        bg: "text_quaternary",
        px: "15px",
        borderRadius: "5px",
        color: "white",
        ml: "10px",
        cursor: "pointer"
    },
    Message: {
        width: "max-content",
        mx: "auto",
        transform: "translateY(-55px)",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}