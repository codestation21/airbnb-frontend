/** @jsxImportSource theme-ui */
// Responsive Design
// Package Installation
import { Container, Heading } from "theme-ui";
import { useSelector } from "react-redux";
// Function and media 
import { getRoom } from "redux/actions/roomActions";
import { getReviews, checkReview } from "redux/actions/reviewAction";
import { addHistory } from "redux/actions/historyAction";
import { wrapper } from "redux/store";
import { authCheck, getUser } from "redux/actions/userActions";
import Heads from "utilis/Heads";
import SingleNav from "sections/Single/SingleNav";
import SingleBody from "sections/Single/SingleBody";

const Single = () => {
    const { room, message } = useSelector(state => state.getRoom);
    return (
        <Container sx={{ color: "text_primary" }}>
            <Heads title={`${room ? room.name : "Room Details"}- Real State Management System`} />
            <SingleNav />
            {message &&
                <Heading sx={styles.ErrorMessage}>{message}</Heading>
            }
            {room &&
                <SingleBody />
            }
        </Container>
    );
};
export default Single;
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
//Serverside data fetching and redirection
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
            await store.dispatch(getRoom(context.req.cookies['token'], context.query.index));
            await store.dispatch(getReviews(context.req.cookies['token'], context.query.index));
            await store.dispatch(checkReview(context.req.cookies['token'], context.query.index));
            await store.dispatch(addHistory(context.req.cookies['token'], context.query.index));
        }
)
