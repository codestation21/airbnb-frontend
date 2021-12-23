/** @jsxImportSource theme-ui */
// Responsive Design
// Package Installation
import { useEffect } from "react";
import { Container, Box, Image, Heading, Paragraph, Flex, Button } from "theme-ui";
import Link from "next/link";
import Heads from "utilis/Heads";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

// Components, media & functions
import Icons from "utilis/Icons";
import { wrapper } from "redux/store";
import { authCheck } from "redux/actions/userActions";
import { getUserProfile, Logout } from "redux/actions/profileAction";

const Profile = () => {
    const profile = useSelector(state => state.profile);
    const Router = useRouter();
    const dispatch = useDispatch();
    const logoutHandle = () => {
        dispatch(Logout())
        Router.push("/login")
    }
    useEffect(() => {
        if (profile.message === "Access Denied! Please log in to continue.") {
            Router.push("/login")
        }
    })
    return (
        <Container sx={{ color: "text_primary", p: "8rem 0", textAlign: "center" }}>
            <Heads title="User Profile- Real state management system" />
            {!profile.user &&
                <Heading sx={{ color: "red" }}>{profile.message ? profile.message : "Something went wrong!"}</Heading>
            }
            {profile.user &&
                <Box variant="FormContainer">
                    <Box sx={{ mt: "-110px" }}>
                        <Image sx={styles.ProfileImage} src={profile.user.avatar} alt="Profile Image" />
                        <Heading sx={styles.UserName} as="h1">{profile.user.name}</Heading>
                        <Paragraph sx={styles.userEmail} as="p">{profile.user.email}</Paragraph>
                        <Paragraph sx={styles.userRole} as="p">{profile.user.role}</Paragraph>
                        <Box sx={styles.userFeatures}>
                            {profile.user.role === "user" &&
                                <Link href="/bookings/me">
                                    <a><Icons icon="bx:bx-book-content" /> My Bookings</a>
                                </Link>
                            }
                            {profile.user.role === "admin" &&
                                <>
                                    <Link href="/admin/rooms">
                                        <a>
                                            <Icons icon="fluent:device-meeting-room-remote-24-filled" /> Rooms
                                        </a>
                                    </Link>
                                    <Link href="/admin/bookings">
                                        <a>
                                            <Icons icon="carbon:book" /> Bookings
                                        </a>
                                    </Link>
                                    <Link href="/admin/users">
                                        <a>
                                            <Icons icon="fa-solid:user-friends" /> Users
                                        </a>
                                    </Link>
                                    <Link href="/admin/reviews">
                                        <a>
                                            <Icons icon="ic:round-reviews" /> Reviews
                                        </a>
                                    </Link>
                                </>
                            }
                        </Box>
                        <Flex sx={styles.ButtonGroup}>
                            <Link href="/me/editprofile">
                                <a>Edit</a>
                            </Link>
                            <Button onClick={logoutHandle}>
                                Logout
                            </Button>
                            <Button sx={styles.HomeButton} onClick={() => Router.back()}>
                                Back
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            }
        </Container>
    );
};
export default Profile;

// stylessheet
const styles = {
    ProfileImage: {
        width: "180px",
        height: "180px",
        objectFit: "cover",
        borderRadius: "50%"
    },
    UserName: {
        fontSize: "30px",
        mb: "3px",
        mt: "5px"
    },
    userEmail: {
        fontSize: "17px",
        color: "#717171",
    },
    userRole: {
        color: "#717171",
        mb: "30px",
        textTransform: "capitalize"
    },
    userFeatures: {
        m: "0",
        textAlign: "left",
        px: "2rem",
        mb: "2rem",
        a: {
            display: "block",
            my: "8px",
            textDecoration: "none",
            color: "black",
            transition: "0.1s ease",
            svg: {
                mb: "-2px",
                fontSize: "17px",
                mr: "2px"
            },
            "&:hover": {
                color: "text_quaternary"
            }
        },

    },
    ButtonGroup: {
        px: "2rem",
        flexWrap: "wrap",
        a: {
            flex: ["0 0 100%", "unset"],
            bg: "#3D84C2",
            mr: "10px",
            p: "8px 20px",
            color: "white",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 700,
            borderRadius: "5px",
            mb: ["5px", "unset"]
        },
        button: {
            flex: ["0 0 100%", "unset"],
            bg: "text_quaternary",
            cursor: "pointer",
            mb: ["5px", "unset"]
        }
    },
    HomeButton: {
        bg: "#3D84C2 !important",
        ml: ["0px", "0px", "18px"],
        mt: ["0px", "5px", "unset"]
    }
}
// Serverside data fetching and redirection
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            await store.dispatch(getUserProfile(context.req.cookies['token']));
            const auth = await store.dispatch(authCheck(context.req.cookies['token']));
            if (!auth) {
                return {
                    redirect: {
                        destination: "/login",
                        permanent: false
                    }
                }
            }
        }
)