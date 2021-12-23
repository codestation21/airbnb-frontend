/** @jsxImportSource theme-ui */
// Responsive Design
// Package Installation
import { Box, Container, Flex, Heading, Paragraph } from "theme-ui";
import Link from "next/link";

const NotFound = () => {
    return (
        <Container sx={{ color: "text_primary" }}>
            <Box sx={styles.Container}>
                <Flex sx={styles.FlexBox}>
                    <Box sx={styles.ErroCode}>
                        <Heading as="h1">404!</Heading>
                    </Box>
                    <Box sx={styles.ErrorMessage}>
                        <Paragraph>This page could not be found.</Paragraph>
                        <Paragraph>Go to <Link href="/">Homepage</Link></Paragraph>
                    </Box>
                </Flex>
            </Box>
        </Container>
    );
};

export default NotFound;

//Stylesheet
const styles = {
    Container: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    FlexBox: {
        alignItems: "center",
        flexWrap: "wrap"
    },
    ErroCode: {
        marginRight: "15px",
        fontSize: "25px",
        position: "relative",
        "&:after": {
            content: '""',
            background: "#0000002b",
            position: "absolute",
            top: "10px",
            bottom: "10px",
            width: "1px",
            right: "-6px",
            display: ["none", null, null, null, "block"]
        }
    },
    ErrorMessage: {
        p: {
            a: {
                fontWeight: 400,
                color: "red",
                textDecoration: "none"
            }
        }
    }
}