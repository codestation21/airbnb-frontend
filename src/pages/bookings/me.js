/** @jsxImportSource theme-ui */
// Responsive design
import { Container, Heading } from "theme-ui";
import { useSelector } from "react-redux";
// Components and media
import Heads from "utilis/Heads";
import { wrapper } from "redux/store";
import { authCheck, getUser } from "redux/actions/userActions";
import { getAllBookings } from "redux/actions/bookingAction";
import SingleNav from "sections/Single/SingleNav";
import Bookings from "sections/Bookings/bookings";

const Me = () => {
    const { bookings, message } = useSelector(state => state.getBookings);
    return (
        <Container sx={{ color: "text_primary" }}>
            <Heads title="My bookings- Real State Management Syste" />
            <SingleNav />
            {message &&
                <Heading sx={styles.ErrorMessage}>{message}</Heading>
            }
            {bookings &&
                <Bookings />
            }
        </Container>
    );
};
export default Me;

// Stylesheets
const styles = {
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
// Serverside data fetching and redirection
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
            await store.dispatch(getAllBookings(context.req.cookies['token']));
        }
)