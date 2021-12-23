/** @jsxImportSource theme-ui */
import { Box, Flex, Heading, Image } from "theme-ui";
import { useEmblaCarousel } from "embla-carousel/react";
import Link from "next/link";

const HomeSlider = ({ Rooms }) => {
    const [emblaRef] = useEmblaCarousel({ containScroll: "trimSnaps" });
    return (
        <div
            className="embla"
            ref={emblaRef}
            sx={{ variant: "Embla", px: ["10px", "12px", "20px", "40px", "50px", "95px"] }}
        >
            <div className="embla__container" sx={{ variant: "EmblaContainer" }}>
                {Rooms &&
                    Rooms.map((room, i) => (
                        <Link href={`/single/${room.id}`} key={i}>
                            <a className="embla__slide" sx={styles.EmblaSlider}>
                                <Image sx={styles.Images} src={room.images[0].url} alt={room.name} />
                                <Box sx={styles.Content}>
                                    <Heading sx={styles.Title} as="h3">{room.name}</Heading>
                                    <Flex sx={styles.FlexContainer}>
                                        <Heading as="h4">One night inentire apartment</Heading>
                                        <Heading as="h2">${room.price}</Heading>
                                    </Flex>
                                </Box>
                            </a>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};
export default HomeSlider;

const styles = {
    EmblaSlider: {
        position: "relative",
        flex: ["0 0 100%", null, "0 0 80%", "0 0 70%", "0 0 50%", "0 0 35%", "0 0 25%"],
        m: "6px",
        cursor: "pointer",
        "&:after": {
            content: '""',
            background: "linear-gradient(rgba(0, 0, 0, 0) 0%, #000 100%)",
            left: "0",
            textAlign: " ",
            top: "0",
            borderRadius: "10px",
            right: "0",
            bottom: "4px",
            position: "absolute",
            opacity: 0.9
        }
    },
    Images: {
        height: "370px",
        objectFit: "cover",
        borderRadius: "10px"
    },
    Content: {
        position: "absolute",
        bottom: "20px",
        left: "0",
        zIndex: 9,
        px: "15px"
    },
    Title: {
        fontSize: "18px",
        mb: "20px",
        fontWeight: "regular",
        display: "-webkit-box",
        WebkitLineClamp: "1",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
    },
    FlexContainer: {
        alignItems: "center",
        borderTop: "1px dashed #ffffff6b",
        paddingTop: "12px",
        h4: {
            flex: "0 0 70%",
            fontSize: "14px",
            fontWeight: "medium",
            opacity: 0.6
        },
        h2: {
            flex: "0 0 30%",
            textAlign: "right",
            fontWeight: 700,
            fontSize: "22px"
        }
    },
    LinkContainer: {
        color: "text",
        textDecoration: "none",
        cursor: "pointer"
    }
}
