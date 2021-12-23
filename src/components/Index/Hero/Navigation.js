/** @jsxImportSource theme-ui */
import { Container, Box, Grid, Input, Image, Link } from 'theme-ui';

import Icons from "utilis/Icons";
import Logo from 'assets/Airbnb-Logo.svg';
import Menu from "utilis/Menu";

const Navigation = () => {
    return (
        <Container px={"25px"} py={"10px"} as="header">
            <Grid columns={[3]} className="grid">
                <Box sx={{ display: ["none", "block"] }}>
                    <Link href="/">
                        <Image src={Logo} alt="Logo" sx={{ width: ["25px", null, null, "30px", "10%"], mt: ["10px", null, null, "7px", "0"] }} />
                    </Link>
                </Box>
                <Box sx={styles.Search}>
                    <Link href="/search">
                        <Icons icon="ic:twotone-search" />
                        <Input placeholder="Try homes In “Greece”" />
                    </Link>
                </Box>
                <Box>
                    <Menu />
                </Box>
            </Grid>
        </Container>
    );
};
export default Navigation;

const styles = {
    Search: {
        position: "relative",
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        svg: {
            position: "absolute",
            fontSize: ["30px", null, null, "35px", "21px"],
            top: "50%",
            transform: "translate(-50%, -50%)",
            left: ["18%", null, null, null, null, "14%", "18%"],
            color: "text_secondary"
        },
        input: {
            display: ["none", null, null, null, "block"],
            border: "none",
            paddingLeft: "25px",
            fontSize: "18px",
            color: "text_secondary",
            width: "100%",
            "&:focus": {
                outline: "none"
            }
        }
    }
}