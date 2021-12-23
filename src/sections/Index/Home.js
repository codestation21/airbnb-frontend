/** @jsxImportSource theme-ui */
// Responsive Design
import { Container, Box, Heading } from "theme-ui";

// Components and media
import BlurSecHeading from "utilis/BlurSecHeading";
import HomeSlider from "components/Index/Home/homeSlider";

const Home = ({ Rooms, cityName, url, BackImage }) => {
    return (
        <Container pl={["10px", null, "15px", "40px", "70px", "110px"]} py={5}>
            {Rooms.message &&
                <Heading variant="DataFetchError">{Rooms.message}</Heading>
            }
            {Rooms.rooms &&
                <>
                    <Box sx={{
                        ...styles.Container,
                        "&:after": {
                            content: '""',
                            background: `linear-gradient(rgba(0, 112, 160, 0) 0%, #003850 100%), url("${BackImage}")`,
                            backgroundPosition: "left",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "91.1%",
                            height: "100%",
                            zIndex: -1,
                            borderRadius: "10px",
                        }
                    }}>
                        <Heading as="h1" sx={styles.LocationTitle}>{cityName}</Heading>
                        <Box
                            ml={["10px", null, "20px", "50px", "90px", "200px"]}
                            pb={4}
                            sx={{
                                background: `url("${BackImage}")`,
                                ...styles.ContentContainer,
                            }}
                        >
                            <Box sx={styles.Content}>
                                <BlurSecHeading name="Discover homes" url={url} />
                                <HomeSlider Rooms={Rooms.rooms} />
                            </Box>
                        </Box>
                    </Box>
                </>
            }
        </Container>
    );
};
export default Home;

// Stylessheet
const styles = {
    Container: {
        position: "relative",
        py: "25px",
    },
    LocationTitle: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%) rotate(-90deg)",
        fontSize: "70px",
        opacity: 0.8,
        left: ["0px", null, null, null, "-35px", "77px"],
        textTransform: "uppercase"
    },
    ContentContainer: {
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        position: "relative",
        borderRadius: "10px 0 0 10px",
        boxShadow: "0 0 70px #ffffff36",
        "&:before": {
            content: '""',
            background: "linear-gradient(rgba(0, 112, 160, 0) 0%, #0038502b 100%)",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            position: "absolute",
            borderRadius: "10px 0 0 10px"
        },
        "&:after": {
            content: '""',
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            position: "absolute",
            backdropFilter: "blur(30px) saturate(200%)",
            WebkitBackdropFilter: "blur(22px) saturate(200%)",
            backgroundColor: "backround_primary_5",
            borderRadius: "10px 0 0 10px"
        }
    },
    Content: {
        position: "relative",
        zIndex: 9
    }
}