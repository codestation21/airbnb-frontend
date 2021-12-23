/** @jsxImportSource theme-ui */
import {Box, Container, Flex, Heading, Paragraph} from "theme-ui";

import {useSelector} from "react-redux";
import Icons from "utilis/Icons";

const SingleContent = () => {
    const {room} = useSelector(state => state.getRoom);
    return (
        <Container>
            <Heading sx={styles.TopicHeading}>Description</Heading>
            <Paragraph sx={styles.Description} as="p">{room.description}</Paragraph>
            <Heading sx={styles.TopicHeading}>Features</Heading>
            <Box>
                {room.guestCapacity &&
                <Flex sx={styles.Features}>
                    <Icons icon="majesticons:user-group"/>
                    <Paragraph>{room.guestCapacity} Guests</Paragraph>
                </Flex>
                }
                {room.numOfBeds &&
                <Flex sx={styles.Features}>
                    <Icons icon="ri:hotel-bed-fill"/>
                    <Paragraph>{room.numOfBeds} Beds</Paragraph>
                </Flex>
                }
                {room.numOfBaths &&
                <Flex sx={styles.Features}>
                    <Icons icon="uil:bath"/>
                    <Paragraph>{room.numOfBaths} Baths</Paragraph>
                </Flex>
                }
                {room.internet &&
                <Flex sx={styles.Features}>
                    <Icons icon="bx:bx-wifi"/>
                    <Paragraph>Wifi</Paragraph>
                </Flex>
                }
                {room.breakFast &&
                <Flex sx={styles.Features}>
                    <Icons icon="ic:round-free-breakfast"/>
                    <Paragraph>Breakfast</Paragraph>
                </Flex>
                }
                {room.airConditioned &&
                <Flex sx={styles.Features}>
                    <Icons icon="iconoir:air-conditioner"/>
                    <Paragraph>Air Contion</Paragraph>
                </Flex>
                }
                {room.petsAllowed &&
                <Flex sx={styles.Features}>
                    <Icons icon="ic:sharp-pets"/>
                    <Paragraph>Pets Allow</Paragraph>
                </Flex>
                }
                {room.roomCleaning &&
                <Flex sx={styles.Features}>
                    <Icons icon="eos-icons:cleanup"/>
                    <Paragraph>Room Cleaning</Paragraph>
                </Flex>
                }
            </Box>
        </Container>
    );
};
export default SingleContent;

const styles = {
    TopicHeading: {
        fontSize: "20px",
        fontWeight: 500,
        mt: "25px",
        mb: "8px"
    },
    Description: {
        fontSize: "16px",
        fontWeight: "light",
        mb: "10px",
        opacity: 0.7
    },
    Features: {
        mb: "8px",
        svg: {
            flex: "0 0 6%",
            fontSize: "23px",
            mt: "-2px"
        },
        p: {
            fontWeight: "light",
            fontSize: "17px",
            opacity: 0.7
        }
    }
}
