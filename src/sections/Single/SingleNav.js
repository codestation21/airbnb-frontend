/** @jsxImportSource theme-ui */
import { Container, Grid, Box, Button } from "theme-ui";
import { useRouter } from "next/router";

import Icons from "utilis/Icons";
import Menu from "utilis/Menu";

const SingleNav = () => {
    const Router = useRouter();
    return (
        <Container py={"5px"} px={[2, null, 3, null, null, 5]}>
            <Grid columns={[2]} sx={{ alignItems: "center" }}>
                <Box sx={styles.Icons}>
                    <Button onClick={() => Router.back()}>
                        <Icons icon="bi:arrow-left" />
                    </Button>
                </Box>
                <Box sx={styles.Menu}>
                    <Menu />
                </Box>
            </Grid>
        </Container>
    );
};
export default SingleNav;

const styles = {
    Menu: {
        div: {
            span: {
                color: "text_primary"
            }
        }
    },
    Icons: {
        button: {
            bg: "none",
            color: "text_primary",
            cursor: "pointer",
            p: "0",
            svg: {
                fontSize: "20px"
            }
        }
    }
}
