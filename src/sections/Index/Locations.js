/** @jsxImportSource theme-ui */
// Responsive Design
import { Container } from "theme-ui";

// Components and media installation
import SectionHeading from "utilis/sectionHeading";
import LocationSlider from "components/Index/Location/LocationSlider";

const Locations = ({ locations, sectionHeading, url, imageStyle, contentStyle }) => {
    return (
        <Container as="section" pt={5}>
            <SectionHeading name={sectionHeading} url={url} />
            <LocationSlider
                locations={locations}
                imageStyle={imageStyle}
                contentStyle={contentStyle}
            />
        </Container>
    );
};
export default Locations;
