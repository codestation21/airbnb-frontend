/** @jsxImportSource theme-ui */
// Responsive Design
import { Container } from "theme-ui";
// Components, media & functions
import SingleNav from "sections/Single/SingleNav";
import Heads from "utilis/Heads";
import BookDetails from "sections/Bookings/bookDetails";
import { wrapper } from "redux/store";
import { authCheck, getUser } from "redux/actions/userActions";
import { getBooking } from "redux/actions/bookingAction";

const BookingDetails = () => {
    return (
        <Container sx={{ color: "text_primary" }}>
            <Heads title="Booking Details- Real State Management Syste" />
            <SingleNav />
            <BookDetails />
        </Container>
    );
};

export default BookingDetails;
//Server side data fetching and redirection
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(authCheck(context.req.cookies['token']));
            if (!auth) {
                return {
                    redirect: {
                        destination: "/login",
                        permanent: false
                    }
                }
            }
            await store.dispatch(getUser(context.req.cookies['token']));
            await store.dispatch(getBooking(context.req.cookies['token'], context.query.index));
        }
)