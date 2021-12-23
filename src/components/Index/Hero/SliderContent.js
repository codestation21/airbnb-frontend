/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Text } from "theme-ui";
import Icons from "utilis/Icons";

const SliderContent = ({ carousel }) => {
    const star = [];
    const starFilled = [];
    for (let i = 0; i < 5; i++) {
        star.push(<Icons key={i} icon="ic:outline-star-border" />)
    }
    for (let i = 0; i < 5; i++) {
        starFilled.push(<Icons key={i} icon="ic:outline-star" />)
    }
    return (
        <Box sx={{ pr: "15px" }}>
            <Heading as="h4" sx={styles.Title}>{carousel.name}</Heading>
            <Flex>
                <Box sx={{ position: "relative", display: ["none", null, "block"] }}>
                    <Box sx={{ color: "text_tartiary", fontSize: "20px" }}>{star}</Box>
                    <Box
                        sx={{
                            ...styles.Star,
                            width: `${(carousel.ratings / 5) * 100}%`
                        }}>
                        {starFilled}
                    </Box>
                </Box>
                <Box sx={{ color: "text_tartiary", display: ["none", null, "block"], }}>
                    / {carousel.numOfReviews}
                </Box>
            </Flex>
            <Box sx={styles.Description}>
                {carousel.guestCapacity > 0 &&
                    <Text>
                        <Text>{carousel.guestCapacity}</Text> guests
                        {(carousel.numOfBeds > 0 || carousel.numOfBaths > 0 || carousel.internet || carousel.airConditioned) &&
                            <Text>,{" "}</Text>
                        }
                    </Text>
                }
                {carousel.numOfBeds > 0 &&
                    <Text>
                        <Text>{carousel.numOfBeds}</Text> bedroom
                        {(carousel.numOfBaths > 0 || carousel.internet || carousel.airConditioned) &&
                            <Text>,{" "}</Text>
                        }
                    </Text>
                }
                {carousel.numOfBaths > 0 &&
                    <Text>
                        <Text>{carousel.numOfBaths}</Text> BathRooms
                        {(carousel.internet || carousel.airConditioned) &&
                            <Text>,{" "}</Text>
                        }
                    </Text>
                }
                {carousel.internet &&
                    <Text>
                        <Text>Wifi</Text>
                        {carousel.airConditioned &&
                            <Text>,{" "}</Text>
                        }
                    </Text>
                }
                {carousel.airConditioned &&
                    <Text>Air Condition</Text>
                }
            </Box>
            <Flex sx={styles.PriceBox}>
                <Heading as="h4">One night in entire apartment</Heading>
                <Heading as="h3">${carousel.price}</Heading>
            </Flex>
        </Box>
    );
};
export default SliderContent;

const styles = {
    Title: {
        fontSize: ["14px", "18px"],
        fontWeight: "medium",
        mb: "4px",
        WebkitLineClamp: "1",
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        overflow: "hidden",
    },
    Star: {
        position: "absolute",
        top: "0",
        left: "0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        color: "text_tartiary",
        fontSize: "20px"
    },
    Description: {
        fontSize: ["10px", "15px"],
        fontWeight: "regular",
        color: "text_primary",
        opacity: 0.6,
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
        display: "-webkit-box",
        overflow: "hidden",
        mb: "8px"
    },
    PriceBox: {
        alignItems: "center",
        h4: {
            flex: "0 0 60%",
            fontSize: "15px",
            opacity: 0.5,
            display: ["none", null, "block"],
        },
        h3: {
            flex: "0 0 40%",
            textAlign: "right",
            fontSize: ["15px", "25px"],
            fontWeight: "bold"
        }
    }
}
