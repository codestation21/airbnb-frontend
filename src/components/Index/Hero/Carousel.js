/** @jsxImportSource theme-ui */
// Package installation
import { Box, Image, Grid } from 'theme-ui';
import { useEmblaCarousel } from 'embla-carousel/react';
import Link from "next/link";

// Components and more media
import ImageSlider from "./ImageSlider";
import SliderContent from "./SliderContent";
import ShapeBg from 'assets/Shape_BG.png'

const Carousel = ({ carousels, tabs }) => {
    const [emblaRef] = useEmblaCarousel({ containScroll: "trimSnaps" });
    return (
        <div
            className="embla"
            ref={tabs === "place" ? emblaRef : (tabs === "rest" ? emblaRef : (tabs === "exp" ? emblaRef : null))}
            sx={styles.Embla}
        >
            <div className="embla__container" sx={{ variant: "EmblaContainer" }}>
                {carousels &&
                    carousels.map((carousel, i) => (
                        <div className="embla__slide" sx={styles.EmblaSlider} key={i}>
                            <Box sx={styles.BackgroundShape}>
                                <Image src={ShapeBg} alt="Shape" />
                            </Box>
                            <Grid columns={[2]} sx={styles.Grid}>
                                <Box sx={styles.ImageSlider}>
                                    <ImageSlider images={carousel.images} tabs={tabs} />
                                </Box>
                                <Box sx={styles.Content} className="sdhfsfhsdfn">
                                    <Link href={`/single/${carousel.id}`}>
                                        <a sx={styles.LinkContainer}>
                                            <SliderContent carousel={carousel} />
                                        </a>
                                    </Link>
                                </Box>
                            </Grid>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
export default Carousel;


// stylesheet
const styles = {
    Embla: {
        overflow: "hidden",
        backdropFilter: "blur(50px) saturate(200%)",
        bg: "backround_primary_2",
        p: "15px",
        borderRadius: "18px 0 18px 0",
        ml: ["10px", "20px", "30px", "5rem"],
        pr: "2rem"
    },
    EmblaSlider: {
        position: "relative",
        flex: ["0 0 100%", null, "0 0 100%", null, "0 0 80%", "0 0 45%"],
        color: "black",
        mx: "8px",
        placeItems: "center",
        display: "flex"
    },
    BackgroundShape: {
        position: "absolute",
        zIndex: -1,
        width: "100%",
        height: "100%",
        img: {
            width: "100%",
            height: "100%"
        },
        "&:after": {
            content: '""',
            backgroundImage: "linear-gradient(black 33%, rgba(255,255,255,0) 0%)",
            backgroundPosition: "right",
            backgroundSize: "5px 10px",
            backgroundRepeat: "repeat-y",
            width: "1px",
            left: "50%",
            position: "absolute",
            top: "25px",
            bottom: "25px"
        }
    },
    LinkContainer: {
        textDecoration: "none",
        color: "text_primary",
        cursor: "pointer"
    },
    Grid: {
        p: "10px",
        alignItems: "center",
    },
    ImageSlider: {
        mr: "10px"
    },
    Content: {
        ml: "10px"
    }
}