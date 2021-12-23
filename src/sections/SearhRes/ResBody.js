/** @jsxImportSource theme-ui */
import { useState } from "react";
import { Box, Container, Grid, Flex } from "theme-ui";
import { useSelector } from "react-redux";

import ResRooms from "components/SearchRes/ResRooms";
import ResMaps from "components/SearchRes/ResMaps";
import Icons from "utilis/Icons";

const ResBody = () => {
    const [toggle, setToggle] = useState(false);
    const { rooms } = useSelector(state => state.roomsByFilter);
    const handleToggle = () => {
        setToggle(!toggle)
    }
    return (
        <Container px={4} pt={3}>
            <Grid columns={[1, null, null, null, null, 2, "0.8fr 1.6fr"]}>
                <Box sx={styles.LeftSide}>
                    <ResRooms rooms={rooms.slice(0, 5)} />
                </Box>
                <Flex>
                    <Box sx={styles.Rooms} className={toggle ? "active" : ""}>
                        <ResRooms rooms={rooms.slice(5, 10)} />
                    </Box>
                    <Box sx={styles.RoomsMaps} className={toggle ? "active" : ""}>
                        <ResMaps />
                        {rooms.length > 5 &&
                            <Box
                                sx={styles.ArrowButton}
                                onClick={handleToggle}
                                className={toggle ? "active" : ""}
                            >
                                <Icons icon="pepicons:angle-right" />
                            </Box>
                        }
                    </Box>
                </Flex>
            </Grid>
        </Container>
    );
};
export default ResBody;

const styles = {
    Rooms: {
        flex: "0 0 50%",
        ml: "-26.8rem",
        transition: "0.3s ease",
        "&.active": {
            ml: "0",
        }
    },
    RoomsMaps: {
        flex: "0 0 100%",
        position: "relative",
        ml: "auto",
        transition: "0.3s ease",
        "&.active": {
            flex: "0 0 50%"
        }
    },
    LeftSide: {
        backgroundColor: "white",
        position: "relative",
        zIndex: 9999
    },
    ArrowButton: {
        position: "absolute",
        top: "10px",
        background: "white",
        px: "13px",
        fontSize: "22px",
        pt: "6px",
        borderRadius: "0 5px 5px 0",
        cursor: "pointer",
        svg: {
            transition: "0.3s ease"
        },
        "&.active": {
            svg: {
                transform: "rotate(-180deg)"
            }
        }
    }
}
