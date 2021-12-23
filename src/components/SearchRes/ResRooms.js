/** @jsxImportSource theme-ui */
import { Container, Flex, Box, Grid } from "theme-ui";
import Link from 'next/link';

import ResImages from "./ResImages";
import SliderContent from "../Index/Hero/SliderContent";

const ResRooms = ({ rooms }) => {
    return (
        <Container>
            <Flex>
                <Box>
                    {rooms &&
                        rooms.map((room, i) => (
                            <Grid
                                columns={[2]}
                                mb={"10px"}
                                key={i}
                                sx={styles.GridContainer}
                            >
                                <Box>
                                    <ResImages images={room.images} />
                                </Box>
                                <Box>
                                    <Link href={`/single/${room.id}`}>
                                        <a sx={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
                                            <SliderContent carousel={room} />
                                        </a>
                                    </Link>
                                </Box>
                            </Grid>
                        ))
                    }
                </Box>
            </Flex>
        </Container>
    );
};
export default ResRooms;

const styles = {
    GridContainer: {
        background: "white",
        borderRadius: "7px",
        paddingTop: "8px",
        paddingBottom: "8px",
        boxShadow: "0 0 20px #0000001a"
    }
}