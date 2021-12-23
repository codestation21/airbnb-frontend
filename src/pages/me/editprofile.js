/** @jsxImportSource theme-ui */
// Responsive Design
// Package Instllation
import { useState, useEffect } from "react";
import { Container, Box, Flex, Heading, Label, Input, Paragraph, Image, Button } from "theme-ui";
import Link from "next/link"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

// Components, media & functions
import { wrapper } from "redux/store";
import { updateUser, clearErrors } from "redux/actions/profileAction";
import { authCheck } from "redux/actions/userActions";
import Heads from "utilis/Heads";
import Icons from "utilis/Icons";
import userProfile from "assets/user-profile.jpg";
import Loader from "assets/Loader.svg";


const EditProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [show, setShow] = useState({
        pass: false,
        passConf: false
    });
    const [avatarPreview, setAvatarPreview] = useState(userProfile);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const onAvatar = (e) => {
        if (e.target.name === "picture") {
            var file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(file)
        }
    }
    const handleShow = (value) => {
        if (value === "password") {
            setShow({
                pass: !show.pass
            })
        } else {
            setShow({
                passConf: !show.passConf
            })
        }
    }
    const { success, loading, message } = useSelector(state => state.updatePorfile);
    const dispatch = useDispatch();
    const onSubmit = (data, e) => {
        dispatch(updateUser(data));
    };
    useEffect(() => {
        if (!success) {
            if (message) {
                setError(true)
                setTimeout(() => {
                    setError(false)
                    dispatch(clearErrors())
                }, 5000)
            }
        } else if (success) {
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
                dispatch(clearErrors())
                Router.push('/me/profile/userprofile');
            }, 1000)
        }
    }, [dispatch, success, message])
    return (
        <Container sx={{ color: "text_primary", p: "6rem 0" }}>
            <Heads title="Create account- Real State Management System" />
            {error &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#FFBABA",
                        color: "#D8000C"
                    }}
                >{message}</Box>
            }
            {successMessage &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#DFF2BF",
                        color: "#74A53C"
                    }}
                >{message}</Box>
            }
            <Box variant="FormContainer">
                <Heading variant="Title" as="h3">Edit Profile</Heading>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box variant="FormControl">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            name="name"
                            id="name"
                            {...register("name")}
                        />
                    </Box>
                    <Box variant="FormControl">
                        <Box sx={{ position: "relative" }}>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                id="password"
                                type={show.pass ? "text" : "password"}
                                {...register(
                                    "password",
                                    {
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                                            message: "Password must contain at least one letter and Number!"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        },

                                    }
                                )}
                            />
                            <Box sx={styles.Eyes} onClick={() => handleShow("password")}>
                                {!show.pass &&
                                    < Icons icon="ant-design:eye-filled" />
                                }
                                {show.pass &&
                                    <Icons icon="ant-design:eye-invisible-filled" />
                                }
                            </Box>
                        </Box>
                        {errors.password && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.password.message}
                            </Paragraph>
                        )}
                    </Box>
                    <Box>
                        <Label sx={styles.Label}>Avatar</Label>
                        <Flex sx={{ alignItems: "center" }}>
                            <Box sx={styles.PreviewImage} className="previewImage">
                                <Image src={avatarPreview} alt="Image" />
                            </Box>
                            <Box sx={styles.FileInput}>
                                <Input
                                    type="file"
                                    id="picture"
                                    {...register(
                                        "picture"
                                    )}
                                    onChange={onAvatar}
                                />
                                <Label htmlFor="picture">Choose Avatar</Label>
                            </Box>
                        </Flex>
                    </Box>
                    <Flex sx={{ flexWrap: "wrap" }}>
                        <Button variant="SubmitButtons" sx={{ flex: ["unset", "0 0 60%"] }} type='submit'>
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="Loading" /> : "Save Changes"
                            }
                        </Button>
                        <Button sx={styles.CancelButton}>
                            <Link href="/me/profile/userprofile">
                                <a>Cancel</a>
                            </Link>
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Container>
    );
};
export default EditProfile;

// stylesheets
const styles = {
    Eyes: {
        position: "absolute",
        right: "10px",
        top: "55%",
        cursor: "pointer",
        zIndex: "999"
    },
    Label: {
        fontSize: "16px",
        mb: "5px"
    },
    FileInput: {
        flex: "0 0 75%",
        position: "relative",
        input: {
            opacity: 0
        },
        label: {
            fontSize: ["12px", "unset"],
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            border: "1px solid #0000004d",
            py: "8px",
            paddingLeft: "10px",
            borderRadius: "4px",
            opacity: 0.5,
            cursor: "pointer",
            "&:after": {
                content: '"Browser"',
                position: "absolute",
                right: "0",
                top: "0",
                fontSize: ["12px", "16px"],
                background: "#e9ecef",
                bottom: "0",
                display: "flex",
                placeItems: "center",
                px: "10px",
                borderRadius: "0 4px 4px 0",
                borderLeft: "1px solid #0000004d"
            }
        }
    },
    Already: {
        opacity: "0.7",
        p: {
            a: {
                color: "text_quaternary"
            }
        }
    },
    PreviewImage: {
        width: ["45px", "55px"],
        height: ["45px", "55px"],
        borderRadius: "50%",
        marginRight: "10px",
        img: {
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover"
        }
    },
    Message: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "16%",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    },
    CancelButton: {
        flex: ["unset", "0 0 40%"],
        width: "200px",
        a: {
            background: "red",
            height: "40px",
            display: "block",
            borderRadius: "7px",
            color: "white",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 500,
            paddingTop: "8px"
        }
    }
}
// Serverside data fetching and redirection
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
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