/** @jsxImportSource theme-ui */
import { Container, Box, Flex, Heading, Paragraph, Image } from "theme-ui";
import { useSelector } from "react-redux";
import TimeAgo from 'react-timeago';

import Icons from "utilis/Icons";

const Reviews = () => {
    const { reviews, message } = useSelector(state => state.getReviews);
    const star = [];
    const starFilled = [];
    for (let i = 0; i < 5; i++) {
        star.push(<Icons key={i} icon="ic:outline-star-border" />)
    }
    for (let i = 0; i < 5; i++) {
        starFilled.push(<Icons key={i} icon="ic:outline-star" />)
    }
    return (
        <Container py={3}>
            <Heading as="h2" sx={styles.ReviewsTitle}>Reviews</Heading>
            {message &&
                <Heading sx={styles.ErrorMessage}><Icons icon="clarity:error-standard-solid" />{message}</Heading>
            }
            {reviews &&
                reviews.map((review, i) => (
                    <Box key={i} sx={styles.Cards}>
                        <Flex sx={{ alignItems: "center", mb: "20px", flexWrap: "wrap" }}>
                            <Box sx={{ flex: ["0 0 10%", null, "0 0 8%", null, "0 0 10%", "0 0 6%"], mr: "15px" }} className="useroh">
                                <Image sx={{ borderRadius: "50%", width: "52px", height: ["30px", "35px", "40px", "52px", "35px", "40px", "52px"], objectFit: "cover" }} src={review.user.avatar} alt={review.user.name} />
                            </Box>
                            <Box sx={{ flex: ["0 0 40%", null, "0 0 55%", null, "0 0 50%", "0 0 60%", null, "0 0 74%"] }}>
                                <Paragraph sx={styles.UserName}>{review.user.name}</Paragraph>
                                <Box sx={{ position: "relative", width: "max-content" }}>
                                    <Box sx={{ color: "text_quaternary", fontSize: "20px" }}>{star}</Box>
                                    <Box
                                        sx={{
                                            ...styles.Star,
                                            width: `${(review.rating / 5) * 100}%`
                                        }}
                                    >{starFilled}</Box>
                                </Box>
                            </Box>
                            <Box sx={{ flex: ["0 0 40%", null, "0 0 32%", null, "0 0 30%", "0 0 20%", "0 0 28%", "0 0 28%"], textAlign: "right" }}>
                                <Paragraph as="p" sx={{ color: "#000000a1" }}>
                                    <TimeAgo date={review.updatedAt} />
                                </Paragraph>
                            </Box>
                        </Flex>
                        <Paragraph as="p" sx={{ color: "#000000a1" }}>{review.comment}</Paragraph>
                    </Box>
                ))
            }
        </Container>
    );
};
export default Reviews;

const styles = {
    ReviewsTitle: {
        fontSize: "20px",
        fontWeight: "regular",
        mb: "15px",
        mt: "20px"
    },
    Cards: {
        mb: "15px",
        borderBottom: "1px solid #00000012",
        pb: "15px"
    },
    Star: {
        position: "absolute",
        top: "0",
        left: "0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        color: "text_quaternary",
        fontSize: "20px"
    },
    UserName: {
        fontSize: "15px",
        mb: "5px",
        color: "#000000c7",
        fontWeight: "700"
    },
    ErrorMessage: {
        color: "#0009",
        fontWeight: 400,
        fontSize: "16px",
        marginTop: "24px",
        svg: {
            mr: "5px",
            mb: "-2px",
            color: "#ff00009c"
        }
    }
}
