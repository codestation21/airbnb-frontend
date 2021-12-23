/** @jsxImportSource theme-ui */
import { Box, Grid, Heading, Button } from "theme-ui";
import Link from 'next/link';
import Icons from "./Icons";

const BlurSecHeading = ({ name, url }) => {
    return (
        <Grid px={["10px", null, "15px", "30px", "50px", "95px"]} pt={"45px"} pb={"25px"} columns={[1, 1, 2]} sx={{ alignItems: "center" }}>
            <Box sx={styles.Content}>
                <Heading as="h2">{name}</Heading>
                <Link href={url}>
                    <a>
                        Show All <Icons icon="akar-icons:arrow-right" />
                    </a>
                </Link>
            </Box>
            <Button sx={styles.Buttons}>
                <Link href="/search">
                    <a>
                        Explore Destinations
                    </a>
                </Link>
            </Button>
        </Grid>
    );
};
export default BlurSecHeading;

const styles = {
    Content: {
        h2: {
            fontSize: ["25px", "32px"]
        },
        a: {
            textDecoration: "none",
            color: "text",
            fontWeight: "bold",
            fontSize: "16px",
            svg: {
                mb: "-4px",
                fontSize: "18px"
            }
        }
    },
    Buttons: {
        textAlign: ["left", null, "right"],
        p: "0",
        m: "0",
        mt: ["5px", null, "0px"],
        a: {
            textDecoration: "none",
            bg: "background",
            p: ["8px 10px", "10px 13px", "13px 15px"],
            borderRadius: "7px",
            color: "black",
            fontWeight: 500
        }
    }
}
