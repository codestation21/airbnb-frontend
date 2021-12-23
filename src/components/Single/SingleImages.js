import { Container, Flex, Box, Image, Paragraph } from "theme-ui";
import { useSelector } from "react-redux";

import { SRLWrapper, useLightbox } from "simple-react-lightbox";

const SingleImages = () => {
    const { room } = useSelector(state => state.getRoom);
    const { openLightbox } = useLightbox()
    return (
        <Container>
            <Flex>
                <Box sx={styles.BigImage}>
                    {room.images.length > 0 &&
                        <Image src={room.images[0].url} alt="Room" />
                    }
                </Box>
                <Box sx={{ flex: "0 0 30%" }}>
                    {room.images.length > 1 &&
                        <Image src={room.images[1].url} sx={styles.SmallImage} alt="Room" />
                    }
                    {room.images.length > 2 &&
                        <Box sx={styles.MoreImage} onClick={() => openLightbox(2)}>
                            <Image src={room.images[2].url} alt="Room" />
                            <Paragraph>See More</Paragraph>
                        </Box>
                    }
                </Box>
            </Flex>
            <Box sx={{ display: "none" }}>
                <SRLWrapper>
                    {room.images.map((image, i) => (
                        <a href={image.url} key={i}>
                            <Image src={image.url} alt="Room" />
                        </a>
                    ))}
                </SRLWrapper>
            </Box>
        </Container>
    );
};

export default SingleImages;

const styles = {
    BigImage: {
        flex: "0 0 70%",
        mr: "4px",
        img: {
            width: "100%",
            height: "100.9%",
            borderRadius: "8px"
        }
    },
    SmallImage: {
        width: "100%",
        height: "50%",
        borderRadius: "8px"
    },
    MoreImage: {
        height: "50%",
        position: "relative",
        cursor: "pointer",
        img: {
            width: "100%",
            height: "100%",
            borderRadius: "8px"
        },
        "&:after": {
            content: '""',
            position: "absolute",
            bg: "text_primary",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            borderRadius: "8px",
            opacity: 0.7
        },
        p: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            zIndex: 99
        }
    }
}