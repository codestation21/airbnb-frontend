/** @jsxImportSource theme-ui */
// Responsive Design
// Package installation
import { Box, Container, Heading, Paragraph, Text } from "theme-ui";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

// Components and functions
import { wrapper } from "redux/store";
import { authCheck, getUser } from "redux/actions/userActions";
import { getRoomsByFilter } from "redux/actions/searchAction";
import Heads from "utilis/Heads";
import ResNav from "sections/SearhRes/ResNav";
import ResBody from "sections/SearhRes/ResBody";
import Paginations from "sections/SearhRes/Paginations";


const SearchResult = () => {
    const router = useRouter();
    const { name } = router.query;
    const { rooms, message } = useSelector(state => state.roomsByFilter);
    return (
        <Container sx={{ color: "text_primary" }}>
            <Heads title="Search Result-Real State Management System" />
            <ResNav />
            {message &&
                <Box sx={styles.ErrorMessage} className="skfhsdf">
                    <Heading>{message}</Heading>
                    {message === "Nothing found!" &&
                        <Paragraph>
                            Your search{" "}
                            <Text>{name}</Text>{" "}
                            did not match any documents.
                        </Paragraph>
                    }
                </Box>
            }
            {rooms &&
                <>
                    <ResBody />
                    <Paginations />
                </>
            }
        </Container>
    );
};
export default SearchResult;

//Stylesheet
const styles = {
    ErrorMessage: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        h2: {
            fontSize: "22px",
            mb: "4px"
        },
        p: {
            color: "#000000bf",
            fontSize: "16px",
            span: {
                color: "#000000c7",
                fontWeight: 700
            }
        }
    }
}
// Serverside function
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
            await store.dispatch(getRoomsByFilter(context.req.cookies['token'], context.query));
        }
)
