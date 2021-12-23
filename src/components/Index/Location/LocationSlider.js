/** @jsxImportSource theme-ui */
import { Box, Heading, Image, Paragraph } from "theme-ui";
import { useEmblaCarousel } from "embla-carousel/react";

const LocationSlider = ({ locations, imageStyle, contentStyle }) => {
    const [emblaRef] = useEmblaCarousel({ containScroll: "trimSnaps" });
    return (
        <div
            className="embla"
            ref={emblaRef}
            sx={{ variant: "Embla", px: ["10px", "12px", "14px", "40px", "70px", "110px"] }}
        >
            <div className="embla__container" sx={{ variant: "EmblaContainer" }}>
                {locations &&
                    locations.map((location, i) => (
                        <div className="embla__slide" sx={styles.EmblaSlider} key={i}>
                            <Image sx={{ ...styles.Images, ...imageStyle }} src={location.image} alt="Images" />
                            <Box sx={{ ...styles.SliderContent, ...contentStyle }}>
                                <Heading>{location.location}</Heading>
                                {location.description &&
                                    <Paragraph>{location.description}</Paragraph>
                                }
                            </Box>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
export default LocationSlider;

const styles = {
    EmblaSlider: {
        position: "relative",
        flex: ["0 0 100%", null, null, "0 0 50%", "0 0 40%", "0 0 25%"],
        m: "8px",
        "&:after": {
            content: '""',
            background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.01) 34.77%, #000 100%)",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "4px",
            opacity: 0.5,
            borderRadius: "12px"
        }
    },
    Images: {
        width: "100%",
        objectFit: "cover",
        borderRadius: "12px"
    },
    SliderContent: {
        position: "absolute",
        transform: "rotate(-90deg)",
        width: "100%",
        zIndex: 9,
        h2: {
            fontSize: "30px",
            fontWeight: 700,
            mb: "-6px"
        },
        p: {
            fontSize: "18px",
            fontWeight: 700
        }
    },
}