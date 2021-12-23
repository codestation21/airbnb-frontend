/** @jsxImportSource theme-ui */
import { Container, Heading } from "theme-ui";
import { useSelector } from "react-redux";

import { wrapper } from "redux/store";
import { authCheck, getUser } from "redux/actions/userActions";
import { checkAdmin } from "redux/actions/adminAction";
import SingleNav from "sections/Single/SingleNav";
import Heads from "utilis/Heads";
import AllReviews from "sections/Admin/allReviews";

const Reviews = () => {
    const { message } = useSelector(state => state.getAllUser);
    return (
        <Container sx={{ color: "text_primary" }}>
            <Heads title="Admin-Realstate management system" />
            <SingleNav />
            {message &&
                <Heading sx={styles.ErrorMessage}>{message}</Heading>
            }
            <AllReviews />
        </Container>
    );
};

export default Reviews;

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
            //await store.dispatch(getAllUsers(context.req.cookies['token']));
        }
)