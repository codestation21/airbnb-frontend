/** @jsxImportSource theme-ui */
import { Container, Heading, Box } from "theme-ui";

import SearchCarousel from "components/Search/PreviousSearch/SearchCarousel";

const PreviousSearch = () => {
    return (
        <Container as="section" pt={"320px"}>
            <Box pl={["10px", null, null, "20px", "30px", "255px", "305px"]} pr={"85px"}>
                <Heading sx={styles.Title} as="h4">Previous Searches</Heading>
            </Box>
            <Box>
                <SearchCarousel />
            </Box>
        </Container>
    );
};
export default PreviousSearch;

const styles = {
    Title: {
        fontSize: "18px",
        fontWeight: "regular",
        marginBottom: "15px"
    }
}
