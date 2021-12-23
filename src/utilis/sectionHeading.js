/** @jsxImportSource theme-ui */
import { Container, Grid, Box, Heading, Link, Button } from "theme-ui";

import Icons from "./Icons";

const SectionHeading = ({ name, url }) => {
    return (
        <Grid px={["10px", "12px", "14px", "40px", "70px", "110px"]} columns={[1, 2]} sx={styles.GridContainer}>
            <Box sx={styles.SecontionContent}>
                <Heading as="h2">{name}</Heading>
                <Link href={url}>Show All <Icons icon="akar-icons:arrow-right" /></Link>
            </Box>
            <Button sx={styles.Buttons}>
                <Link href="/">
                    Explore Destinations
                </Link>
            </Button>
        </Grid>
    );
};
export default SectionHeading;

const styles = {
    GridContainer: {
        color: "text_primary",
        alignItems: "center",
        marginBottom: "2rem"
    },
    SecontionContent: {
        h2: {
            fontSize: ["20px", "21px", "22px", "30px"],
            fontWeight: "bold",
            mb: "2px"
        },
        a: {
            color: "text_primary",
            fontSize: ["14px", "15px", null, "16px"],
            fontWeight: "regular",
            svg: {
                fontSize: "17px",
                mb: "-3px"
            }
        }
    },
    Buttons: {
        textAlign: "right",
        p: "0",
        m: "0",
        a: {
            border: "1.9px solid black",
            padding: ["3px 4px", "4px 5px", "16px 25px"],
            borderRadius: "6px",
            color: "text_primary",
            fontSize: "16px",
            fontWeight: "medium"
        }
    }
}
