/** @jsxImportSource theme-ui */
import { Box, Heading, Image, Grid, Text } from "theme-ui";
import { useEmblaCarousel } from "embla-carousel/react";
import { useSelector } from "react-redux";
import Link from "next/link";

import Icons from "utilis/Icons";

const SearchCarousel = () => {
    const [emblaRef] = useEmblaCarousel({ containScroll: "trimSnaps" });
    const { history, message } = useSelector(state => state.getHistory);
    return (
        <>
            {message &&
                <Heading sx={styles.ErrorMessage}>Something went wrong!</Heading>
            }
            <div
                className="embla"
                ref={emblaRef}
                sx={{ variant: "Embla", pl: ["10px", null, null, "20px", "30px", "255px", "305px"], pr: "85px" }}
            >
                <div className="embla__container" sx={{ variant: "EmblaContainer" }}>
                    {history && history.length > 0 &&
                        history.map((history, i) => (
                            <div className="embla__slide" sx={styles.EmblaSlider} key={i}>
                                <Image sx={styles.Image} src={history.room.images[0].url} alt="Images" />
                                <Box sx={styles.Container}>
                                    <Heading sx={styles.Title}>{history.room.name}</Heading>
                                    <Grid columns={[2]} sx={{ alignItems: "center" }}>
                                        <Box sx={{ display: ["none", "block"] }}>
                                            <Box sx={styles.Description}>
                                                {history.room.guestCapacity > 0 &&
                                                    <Text>
                                                        {history.room.guestCapacity} Guest
                                                        {history.room.numOfBeds > 0 &&
                                                            <Text>, {" "}</Text>
                                                        }
                                                    </Text>
                                                }
                                                {history.room.numOfBeds > 0 &&
                                                    <Text>{history.room.numOfBeds} Beds</Text>
                                                }
                                            </Box>
                                            <Box className="rterf">
                                                {history.room.internet &&
                                                    <Text>
                                                        Wifi
                                                        {history.room.breakFast &&
                                                            <Text>, {" "}</Text>
                                                        }
                                                    </Text>
                                                }
                                                {history.room.breakFast &&
                                                    <Text>Breakfast</Text>
                                                }
                                            </Box>
                                        </Box>
                                        <Box sx={styles.DetailsButton}>
                                            <Link href={`/single/${history.room.id}`}>
                                                <a><Icons icon="bi:arrow-right" /></a>
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Box>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};
export default SearchCarousel;
const styles = {
    EmblaSlider: {
        position: "relative",
        flex: ["0 0 100%", null, "0 0 80%", "0 0 70%", "0 0 60%", "0 0 40%", "0 0 35%", "0 0 30%"],
        m: "8px",
        "&:after": {
            content: '""',
            position: "absolute",
            background: "linear-gradient(rgba(0, 0, 0, 0) 0%, #000 100%)",
            bottom: "0",
            left: "0",
            right: "0",
            top: "0",
            borderRadius: "10px"
        }
    },
    Image: {
        height: "100%",
        borderRadius: "10px"
    },
    Container: {
        position: "absolute",
        bottom: "10px",
        zIndex: 99,
        color: "white",
        left: "5%",
        right: "5%"
    },
    Title: {
        fontSize: ["15px", "20px"],
        fontWeight: "regular",
        marginBottom: "15px",
        borderBottom: "1px dashed #ffffff69",
        paddingBottom: "15px"
    },
    Description: {
        span: {
            fontSize: "15px",
            opacity: 0.7,
            fontWeight: "medium"
        }
    },
    DetailsButton: {
        textAlign: ["left", "right"],
        a: {
            svg: {
                color: "white",
                fontSize: "22px"
            }
        }
    },
    ErrorMessage: {
        position: "absolute",
        bottom: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "20px",
        fontWeight: 500,
        color: "red"
    }
}
