/** @jsxImportSource theme-ui */
// Responsive design
// Package Instllation
import { Container, Button, Flex } from "theme-ui";
import easyinvoice from 'easyinvoice';
import Link from 'next/link';
import { useSelector } from "react-redux";
import MaterialTable from 'material-table';
// Icons
import Icons from 'utilis/Icons';

const Bookings = () => {
    const { bookings } = useSelector(state => state.getBookings);
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
                        <Link href={`/bookings/bookingdetails/${booking.id}`}>
                            <a sx={styles.EyeButton}><Icons icon="fa-solid:eye" /></a>
                        </Link>
                        <Button sx={styles.DownloadButton} onClick={() => downloadInvoice(booking)}>
                            <Icons icon="fa-solid:download" />
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

    const downloadInvoice = async (booking) => {
        console.log("Siam Ahnaf")
        const data = {
            "documentTitle": "Booking INVOICE",
            "currency": "USD",
            "taxNotation": "vat",
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://i.ibb.co/s523j5f/pngegg-61.png",
            "sender": {
                "company": "Airbnb Project",
                "address": "Kamrangir Char",
                "zip": "1211",
                "city": "Dhaka",
                "country": "Bangladesh"
            },
            "client": {
                "company": `${booking.user.name}`,
                "address": `${booking.user.email}`,
                "zip": "",
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleDateString('en-US')}`,
                "country": ` Check Out: ${new Date(booking.checkOutDate).toLocaleDateString('en-US')}`
            },
            "invoiceNumber": `${booking.id}`,
            "invoiceDate": `${new Date(Date.now()).toLocaleDateString('en-US')}`,
            "products": [
                {
                    "quantity": `${booking.daysOfStay}`,
                    "description": `${booking.room.name}`,
                    "tax": 0,
                    "price": booking.room.price
                }
            ],
            "bottomNotice": "This is auto generated Invoice of your booking on Airbnb Project",
        };
        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice${booking.id}.pdf`, result.pdf);
    }
    return (
        <Container px={["10px", null, null, null, "20px", "80px"]} pt={"45px"} sx={styles.BookingContainer}>
            <MaterialTable columns={columns} data={data} title='My Bookings' />
        </Container>
    );
};
export default Bookings;

// Stylesheets
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
        bg: "#28A745",
        px: "15px",
        borderRadius: "5px",
        color: "white",
        ml: "10px",
        cursor: "pointer"
    }
}