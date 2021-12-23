/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { Container, Grid, Box, Flex, Text } from "theme-ui";
import { useRouter } from "next/router";
import Link from "next/link";

import Icons from "utilis/Icons";
import Menu from "utilis/Menu";

const ResNav = () => {
    const [navText, setNavText] = useState("");
    const router = useRouter();
    const { name, location } = router.query;
    useEffect(() => {
        if (name) {
            setNavText(name)
        } else {
            setNavText(location)
        }
    }, [name, location])
    return (
        <Container px={4} py={"5px"}>
            <Grid columns={[1, null, 2]} sx={{ alignItems: "center" }}>
                <Box sx={styles.BackButtons}>
                    <Link href="/search">
                        <a>
                            <Icons icon="bi:arrow-left" />
                            <Text>
                                {navText ?
                                    <Text sx={{ color: "#00000087", fontSize: ["unset", "unset", "15px", "unset"] }}>Your search result
                                        for <Text
                                            sx={styles.BackButtonText}>{navText.replace(/-/g, ' ')}</Text></Text> : "Back to search"}
                            </Text>
                        </a>
                    </Link>
                </Box>
                <Flex sx={styles.FlexContent}>
                    <Box sx={styles.Filters}>
                        <Link href="/search/filter">
                            <a>
                                <Text>Show Filters</Text>
                                <Icons icon="ci:filter" />
                            </a>
                        </Link>
                    </Box>
                    <Box sx={styles.Menu}>
                        <Menu />
                    </Box>
                </Flex>
            </Grid>
        </Container>
    );
};
export default ResNav;

const styles = {
    BackButtons: {
        a: {
            textDecoration: "none",
            color: "black",
            svg: {
                fontSize: "20px",
                mb: "-4px",
                mr: "10px"
            }
        }
    },
    BackButtonText: {
        fontSize: ["unset", "unset", "15px", "unset"],
        color: "black",
        textTransform: "capitalize"
    },
    FlexContent: {
        alignItems: "center",
        justifyContent: "end"
    },
    Filters: {
        mr: "25px",
        textAlign: ["center", "unset", "center", "unset"],
        a: {
            textDecoration: "none",
            color: "black",
            span: {
                fontSize: ["14px", "16px", "14px", "16px", "18px"],
                fontWeight: "medium",
                opacity: 0.6
            },
            svg: {
                fontSize: ["18px", "25px", "18px", "25px", "28px"],
                mb: "-9px",
                ml: "10px"
            }
        }
    },
    Menu: {
        span: {
            color: "black !important"
        }
    },
}
