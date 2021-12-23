/** @jsxImportSource theme-ui */
// Responsive Design
// Package Installation
import { useState } from "react";
import { Container, Grid, Box, Button, Heading } from "theme-ui";
import { useSelector } from "react-redux";

// Components and Media installation
import { place, restaurants, exprience } from 'data/HeroBody';
import Navigation from "components/Index/Hero/Navigation";
import HeroBody from "components/Index/Hero/HeroBody";
import Carousel from "components/Index/Hero/Carousel";
import BgPic from 'assets/Blurred-Pic.jpg';
import BgPic1 from 'assets/Hero-bg.jpg';

const Hero = () => {
    // Redux data apply
    const { rooms, message } = useSelector(state => state.allRooms);
    // UseState for hero tab
    const [tab, setTabs] = useState({
        tabs: "place"
    });
    const handleTab = (value) => {
        if (value === "place") {
            setTabs({
                tabs: "place"
            })
        } else if (value === "rest") {
            setTabs({
                tabs: "rest"
            })
        } else {
            setTabs({
                tabs: "exp"
            })
        }
    }
    return (
        <Container as="section" px={["12px", "14px", "18px", "35px", "50px", "85px"]} sx={styles.Container}>
            <Box sx={{ position: 'relative', zIndex: "1" }}>
                <Navigation />
                {message &&
                    <Heading variant="DataFetchError">{message}</Heading>
                }
                {rooms &&
                    <>
                        <Box sx={styles.HeroContainer}>
                            <Box className={tab.tabs === "place" ? 'active' : ''} sx={styles.Demo}>
                                <HeroBody Heros={place} />
                                <Carousel carousels={rooms.slice(0, 5)} tabs={tab.tabs === "place" ? 'place' : ''} />
                            </Box>
                            <Box className={tab.tabs === "rest" ? 'active' : ''} sx={styles.Demo}>
                                <HeroBody Heros={restaurants} />
                                <Carousel carousels={rooms.slice(5, 10)} tabs={tab.tabs === "rest" ? 'rest' : ''} />
                            </Box>
                            <Box className={tab.tabs === "exp" ? 'active' : ''} sx={styles.Demo}>
                                <HeroBody Heros={exprience} />
                                <Carousel carousels={rooms.slice(10, 15)} tabs={tab.tabs === "exp" ? 'exp' : 'null'} />
                            </Box>
                        </Box>
                        <Grid px={"25px"} columns={[3]} sx={styles.Buttons}>
                            <Button
                                onClick={() => handleTab("place")}
                                className={tab.tabs === "place" ? 'active' : ''}
                            >
                                Places to stay</Button>
                            <Button
                                onClick={() => handleTab("rest")}
                                className={tab.tabs === "rest" ? 'active' : ''}
                            >
                                Restaurants</Button>
                            <Button
                                onClick={() => handleTab("exp")}
                                className={tab.tabs === "exp" ? 'active' : ''}
                            >
                                Experiences</Button>
                        </Grid>
                    </>
                }
            </Box>
        </Container>
    );
};
export default Hero;

//Stylesheet
const styles = {
    Demo: {
        display: "none",
        '&.active': {
            display: "block"
        }
    },
    Container: {
        background: `url('${BgPic}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        "&:after": {
            content: '""',
            backdropFilter: "blur(50px) saturate(200%)",
            bg: "backround_primary",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0"
        }
    },
    HeroContainer: {
        background: `url('${BgPic1}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        borderRadius: "18px",
        mt: "8px",
        "&:after": {
            content: '""',
            width: "93%",
            height: "15px",
            position: "absolute",
            bottom: "-10px",
            borderRadius: "0 0 25px 25px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: -1,
            backdropFilter: "blur(25px) saturate(180%)",
            backgroundColor: "backround_primary_3"
        }
    },
    Buttons: {
        textAlign: "center",
        pt: "15px",
        pb: "10px",
        my: "10px",
        button: {
            fontSize: ["8px", "16px", "18px"],
            opacity: 0.7,
            fontWeight: 500,
            position: "relative",
            transition: "0.3s ease",
            cursor: "pointer",
            "&:after": {
                content: '""',
                position: "absolute",
                width: "15px",
                height: "4px",
                background: "white",
                left: "50%",
                transform: "translateX(-50%)",
                top: "0",
                borderRadius: "10px",
                opacity: 0,
                transition: "0.3s ease"
            },
            "&:hover": {
                opacity: 1
            },
            "&.active": {
                "&:after": {
                    opacity: 1
                }
            }
        }
    }
}
