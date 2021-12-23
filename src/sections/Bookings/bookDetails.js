/** @jsxImportSource theme-ui */
import { Container, Box, Flex, Paragraph, Heading, Text, Image } from "theme-ui";
import Link from 'next/link';
import { useSelector } from "react-redux";

const BookDetails = () => {
    const { booking, message } = useSelector(state => state.getBooking);
    return (
        <Container px={[2, null, null, 5]} py={4}>
            {message &&
                <Heading sx={styles.ErrorMessage}>{message}</Heading>
            }
            {booking &&
                <>
                    <Heading as="h1" sx={styles.Heading}>
                        Booking{" "}
                        <Text># {booking.id}</Text>
                    </Heading>
                    <Box sx={styles.BookingHeading}>
                        <Heading as='h4'>User Info</Heading>
                        <Box sx={styles.BookingInfo}>
                            <Paragraph>
                                Name: <Text>{booking.user.name}</Text>
                            </Paragraph>
                            <Paragraph>
                                Email: <Text>{booking.user.email}</Text>
                            </Paragraph>
                            <Paragraph>
                                Amount: <Text>${booking.amountPaid}</Text>
                            </Paragraph>
                        </Box>
                    </Box>
                    <Box sx={styles.BookingHeading}>
                        <Heading as='h4'>Booking Info</Heading>
                        <Box sx={styles.BookingInfo}>
                            <Paragraph>
                                Check In: <Text>{new Date(booking.checkInDate).toLocaleString('en-Us')}</Text>
                            </Paragraph>
                            <Paragraph>
                                Check Out: <Text>{new Date(booking.checkOutDate).toLocaleString('en-Us')}</Text>
                            </Paragraph>
                            <Paragraph>
                                Booking Date: <Text>{new Date(booking.paidAt).toLocaleString('en-Us')}</Text>
                            </Paragraph>
                            <Paragraph>
                                Days of Stay: <Text>{booking.daysOfStay}</Text>
                            </Paragraph>
                        </Box>
                    </Box>
                    <Box sx={styles.BookingHeading}>
                        <Heading as='h4'>Payment Status</Heading>
                        <Paragraph sx={styles.Paid}>Paid</Paragraph>
                    </Box>
                    <Box sx={styles.BookingHeading}>
                        <Heading as='h4'>Booking Info</Heading>
                        <Flex className="roomsfhbs" sx={{ alignItems: "center", flexWrap: "wrap" }}>
                            <Box sx={{ flex: ["0 0 25%", null, "0 0 12%"] }}>
                                <Image sx={styles.Image} src={booking.room.images[0].url} />
                            </Box>
                            <Box sx={{ flex: ["0 0 70%", null, "0 0 40%"], ml: ["10px", null, "unset"] }}>
                                <Link href={`/single/${booking.room.id}`}>
                                    <a sx={styles.LinkTag}>{booking.room.name}</a>
                                </Link>
                            </Box>
                            <Box sx={{ flex: ["0 0 50%", null, "0 0 23%"], fontSize: "17px" }}>
                                ${booking.room.price} / night
                            </Box>
                            <Box sx={{ flex: ["0 0 50%", null, "0 0 25%"], fontSize: "17px" }}>
                                {booking.daysOfStay} day(s)
                            </Box>
                        </Flex>
                    </Box>
                </>
            }
        </Container>
    );
};
export default BookDetails;


const styles = {
    Heading: {
        fontSize: ["17px", null, "2rem"],
        mb: "2rem",
        fontWeight: 500,
        color: "#000c",
        span: {
            textTransform: "uppercase"
        }
    },
    BookingHeading: {
        mb: "1rem",
        borderBottom: "1px solid #0000001a",
        pb: "1rem",
        h4: {
            fontSize: ["16px", null, "1.4rem"],
            fontWeight: 400,
            mb: "1rem",
            color: "#000000c9"
        }
    },
    BookingInfo: {
        ml: "18px",
        p: {
            my: "9px",
            fontSize: ["14px", null, "17px"],
            fontWeight: 700,
            color: "#000000d1",
            span: {
                fontWeight: 400
            }
        }
    },
    Paid: {
        ml: "18px",
        fontWeight: 700,
        color: "green",
        mt: "25px"
    },
    Image: {
        width: "90px",
        height: "50px",
        objectFit: "cover",
        borderRadius: "4px"
    },
    LinkTag: {
        textDecoration: "none",
        fontSize: "17px",
        color: "#007BFF",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline"
        }
    },
    ErrorMessage: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "20px",
        fontWeight: 500,
        color: "red"
    }
}