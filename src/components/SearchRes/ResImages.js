/** @jsxImportSource theme-ui */
import { Image } from "theme-ui";
import { useEmblaCarousel } from "embla-carousel/react";
import { useCallback, useEffect, useState } from "react";
import { DotButton } from "utilis/CarouselBtn";

const ResImages = ({ images }) => {
    const [emblaRef, embla] = useEmblaCarousel();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
    }, [embla, setSelectedIndex]);
    useEffect(() => {
        if (!embla) return;
        onSelect();
        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
    }, [embla, setScrollSnaps, onSelect]);
    return (
        <div
            className="embla"
            ref={emblaRef}
            sx={{ variant: "Embla", position: "relative" }}
        >
            <div className="embla__container" sx={{ variant: "EmblaContainer" }}>
                {images &&
                    images.map((image, i) => (
                        <div className="embla__slide" sx={styles.EmblaSlider} key={i}>
                            <Image sx={styles.Images} src={image.url} alt="Image" />
                        </div>
                    ))
                }
            </div>
            <div className="embla__dots" sx={styles.DotButton}>
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        selected={index === selectedIndex}
                        onClick={() => scrollTo(index)}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};
export default ResImages;

const styles = {
    EmblaSlider: {
        mb: "5px",
        position: "relative",
        flex: "0 0 100%",
        "&:after": {
            content: '""',
            width: "80%",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "-4px",
            position: "absolute",
            height: "15px",
            borderRadius: "0 0 10px 10px",
            zIndex: -1,
            backdropFilter: "blur(25px) saturate(180%)",
            WebkitBackdropFilter: "blur(25px) saturate(180%)",
            backgroundColor: "backround_primary_4"
        }
    },
    DotButton: {
        position: "absolute",
        bottom: "12px",
        left: "50%",
        transform: "translateX(-50%)",
        button: {
            background: "white",
            p: ["2px", "5px"],
            borderRadius: "50%",
            m: "2px",
            opacity: "0.7",
            transition: "0.3s ease",
            cursor: "pointer",
            "&.is-selected": {
                opacity: "1"
            }
        }
    },
    Images: {
        borderRadius: "15px",
        height: "100%",
        p: "2px"
    }
}
