/** @jsxImportSource theme-ui */
import { Container, Heading } from "theme-ui";
import { useSelector } from "react-redux";

import { wrapper } from "redux/store";
import { authCheck, getUser } from "redux/actions/userActions";
import { checkAdmin, getAllRoomsForAdmin } from "redux/actions/adminAction";
import SingleNav from "sections/Single/SingleNav";
import Heads from "utilis/Heads";
import AllRooms from "sections/Admin/allRooms";


const Rooms = () => {
    const { message } = useSelector(state => state.getAdminRooms);
    return (
        <Container sx={{ color: "text_primary" }}>
            <Heads title="Admin-Realstate management system" />
            <SingleNav />
            {message &&
                <Heading sx={styles.ErrorMessage}>{message}</Heading>
            }
            <AllRooms />
        </Container>
    );
};
export default Rooms;

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
            const admin = await store.dispatch(checkAdmin(context.req.cookies['token']));
            if (!admin) {
                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
            await store.dispatch(getUser(context.req.cookies['token']));
            await store.dispatch(getAllRoomsForAdmin(context.req.cookies['token']));
        }
)