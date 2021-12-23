/** @jsxImportSource theme-ui */
// Package installation
import { Box, Heading, Text, Paragraph } from 'theme-ui';

const HeroBody = ({ Heros }) => {
    return (
        <Box sx={styles.Container}>
            <Heading as="h1">{Heros.title}</Heading>
            <Text as="h3">{Heros.subtitle}</Text>
            <Paragraph as="p">{Heros.description}</Paragraph>
        </Box>
    );
};
export default HeroBody;

//Stylesheet
const styles = {
    Container: {
        padding: ["20px", "30px", "40px", "50px", "4.6rem"],
        h1: {
            fontSize: ["35px", "50px", "60px", "65px", "80px"],
            fontWeight: "black"
        },
        h3: {
            fontSize: ["20px", "35px"],
            mt: ["0px", "-5px", "-10px", "-15px"],
            fontWeight: "bold",
            mb: "5px"
        },
        p: {
            fontSize: ["15px", "18px"],
            fontWeight: "body"
        }
    }
}
