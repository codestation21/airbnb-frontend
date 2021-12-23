/** @jsxImportSource theme-ui */
import { Container, Grid, Box } from "theme-ui";
import { useSelector } from "react-redux";

import SingleImages from "components/Single/SingleImages";
import SingleContent from "components/Single/SingleContent";
import Reviews from "components/Single/Reviews";
import SingleTable from "components/Single/singleTable";
import AddReviews from "components/Single/addReviews";

const SingleBody = () => {
    const { isReview } = useSelector(state => state.checkReview);
    return (
        <Container px={[2, null, 3, null, null, 5]} py={3} className="flejhr">
            <Grid columns={[1, null, null, null, 2, '1.8fr 0.8fr']}>
                <Box>
                    <Box>
                        <SingleImages />
                        <SingleContent />
                        {isReview && isReview.isCanAdd == true &&
                            <AddReviews />
                        }
                        <Reviews />
                    </Box>
                </Box>
                <Box>
                    <Box sx={styles.RightSticky}>
                        <SingleTable />
                    </Box>
                </Box>
            </Grid>
        </Container>
    );
};
export default SingleBody;

const styles = {
    RightSticky: {
        position: "sticky",
        top: "15px",
        background: "white",
        boxShadow: "0 0 20px #00000021",
        padding: "15px",
        borderRadius: "8px"
    }
}