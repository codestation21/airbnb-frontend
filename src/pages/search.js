/** @jsxImportSource theme-ui */
// Responsive Design
// Package Instllation
import { Container } from "theme-ui";

// Components and functions
import { wrapper } from "redux/store";
import { authCheck, getUser } from "redux/actions/userActions";
import { getInitSearchRooms } from 'redux/actions/searchAction';
import { getHistory } from "redux/actions/historyAction";
import Heads from "utilis/Heads";
import SearchNav from "sections/Search/SearchNav";
import PreviousSearch from "sections/Search/PreviousSearch";

const Search = () => {
    return (
        <Container sx={{ color: "text_primary" }}>
            <Heads title="Search-Real State Management System" />
            <SearchNav />
            <PreviousSearch />
        </Container>
    );
};
export default Search;


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
            await store.dispatch(getInitSearchRooms(context.req.cookies['token']));
            await store.dispatch(getHistory(context.req.cookies['token']));
        }
)
