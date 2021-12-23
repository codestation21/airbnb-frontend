/** @jsxImportSource theme-ui */
import { useState, useRef, useEffect } from "react";
import Cookies from 'js-cookie';
import { Box, Button, Image, Text, Heading, Divider } from "theme-ui";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import Icons from "./Icons";
import Link from "next/link";
import { Logout } from "../redux/actions/profileAction";

const Menu = () => {
    const ref = useRef();
    const [profile, setProfile] = useState(false);
    const dispatch = useDispatch()
    const handleProfle = () => {
        setProfile(!profile)
    }
    const logoutHandle = () => {
        dispatch(Logout())
        Router.push("/login")
    }
    const { user, message } = useSelector(state => state.getUser);
    useOnClickOutside(ref, () => setProfile(false));

    useEffect(() => {
        if (message === "Access Denied! Please log in to continue.") {
            Cookies.remove('token');
            Router.push("/login");
        }
    })
    return (
        <Box sx={styles.Container} className="heloasiefj" ref={ref}>
            {!user &&
                <Heading sx={{ fontSize: "15px", fontWeight: 600, color: "red" }}>Error Occured</Heading>
            }
            {user &&
                <>
                    <Box sx={styles.Profile} onClick={handleProfle}>
                        <Text>{user.name.split(" ")[0]}</Text>
                        <Box sx={styles.ProfileImage}>
                            <Image src={user.avatar} alt="Profile" />
                        </Box>
                    </Box>
                    <Box sx={styles.ExpandProfile} className={profile ? "active" : ""}>
                        {user.role === "admin" &&
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
                                <Divider sx={{ color: "#0000002e" }} />
                            </>
                        }
                        <Link href="/bookings/me">
                            <a>
                                <Icons icon="bx:bx-book-content" /> My Bookings
                            </a>
                        </Link>
                        <Link href={`/me/profile/${user.name.toLowerCase().replace(/\s/g, '')}`}>
                            <a>
                                <Icons icon="fa-solid:user" /> Profile
                            </a>
                        </Link>
                        <Button onClick={logoutHandle}>
                            <Icons icon="ls:logout" /> Logout
                        </Button>
                    </Box>
                </>
            }
        </Box>
    );
};
export default Menu;

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}

const styles = {
    Container: {
        position: "relative",
        width: "max-content",
        marginLeft: "auto",
    },
    Profile: {
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "right",
        p: "5px 20px",
        borderRadius: "50px",
        backdropFilter: "blur(16px) saturate(150%)",
        backgroundColor: "rgba(97, 125, 184, 0.2)",
        cursor: "pointer",
        pr: "8px",
        span: {
            fontSize: "20px",
            marginRight: "10px",
            color: "text_secondary"
        }
    },
    ProfileImage: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        position: "relative",
        img: {
            width: "100%",
            height: "100%",
            borderRadius: "100%"
        },
        "&:after": {
            content: '""',
            position: "absolute",
            width: "10px",
            height: "10px",
            bg: "backround_secondary",
            right: "1px",
            top: "1px",
            borderRadius: "50%"
        }
    },
    ExpandProfile: {
        bg: "background",
        position: "absolute",
        top: "110%",
        right: "0",
        borderRadius: "5px",
        zIndex: 99999,
        py: "5px",
        px: "12px",
        width: "175px",
        boxShadow: "0 0 20px #0000002e",
        display: "none",
        "&:after": {
            content: '""',
            background: "white",
            width: "12px",
            height: "12px",
            position: "absolute",
            top: "-3px",
            left: " ",
            right: "25%",
            transform: "rotate(135deg)"
        },
        button: {
            color: "#FF5A5F",
            p: "0",
            py: "2px",
            cursor: "pointer",
            svg: {
                mb: "-3px",
                mr: "3px"
            }
        },
        a: {
            display: "block",
            my: "10px",
            textDecoration: "none",
            fontSize: "16px",
            color: "text_primary",
            svg: {
                mb: "-3px",
                mr: "5px"
            }
        },
        "&.active": {
            display: "block"
        }
    }
}
