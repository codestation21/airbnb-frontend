/** @jsxImportSource theme-ui */
import {Container, Box, Paragraph} from "theme-ui";
import {useRouter} from "next/router";

import {useSelector} from "react-redux";
import Pagination from "react-js-pagination";

const Paginations = () => {
    const {pageInfo} = useSelector(state => state.roomsByFilter);
    const Router = useRouter();
    let {page = 1} = Router.query;
    page = Number(page);

    const setCurrentPageNo = (pageNumber) => {
        Router.query.page = pageNumber;
        Router.push(Router);
    }
    return (
        <Container>
            {pageInfo.resultPerPage < pageInfo.count &&
            <Box className="pahosdfnsdhfn" sx={styles.Pagination}>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={pageInfo.resultPerPage}
                    totalItemsCount={pageInfo.count}
                    onChange={setCurrentPageNo}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                />
            </Box>
            }
        </Container>
    );
};
export default Paginations;

const styles = {
    Pagination: {
        textAlign: "center",
        mt: "3em",
        mb: "2em",
        ul: {
            li: {
                display: "inline-block",
                a: {
                    py: "7px",
                    px: "12px",
                    border: "1px solid #00000029",
                    textDecoration: "none",
                    color: "text_primary",
                    borderRight: "none",
                    transition: "0.2s ease",
                    "&:hover": {
                        color: "text_quaternary"
                    }
                },
                "&:last-of-type": {
                    a: {
                        borderRight: "1px solid #00000029",
                        borderRadius: "0 5px 5px 0"
                    }
                },
                "&:first-of-type": {
                    a: {
                        borderRadius: "5px 0 0 5px"
                    }
                },
                "&.disabled": {
                    a: {
                        color: "#0006",
                        pointerEvents: "none"
                    }
                },
                "&.active": {
                    a: {
                        bg: "text_quaternary",
                        color: "text"
                    }
                }
            }
        }
    }
}