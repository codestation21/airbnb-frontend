/** @jsxImportSource theme-ui */
// Responsive design 
// Package Installation
import { useState, useEffect } from "react";
import { Container, Box, Flex, Heading, Label, Input, Paragraph, Image, Button, Link } from "theme-ui";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
// Components and Function
import { wrapper } from "redux/store";
import Heads from "utilis/Heads";
import { signUp, clearErrors, authCheck } from "redux/actions/userActions";
import Icons from "utilis/Icons";
import userProfile from "assets/user-profile.jpg";
import Loader from "assets/Loader.svg";


const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
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
    const password = watch("password", "");
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
    const { success, loading, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // Submit Handler
    const onSubmit = (data, e) => {
        dispatch(signUp(data))
        setAvatarPreview(userProfile);
        e.target[0].value = ""
        e.target[1].value = ""
        e.target[2].value = ""
        e.target[3].value = ""
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
                Router.push('/');
            }, 1000)
        }
    }, [dispatch, success, message])
    return (
        <Container sx={{ color: "text_primary", p: "4rem 0" }}>
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
                <Heading variant="Title" as="h3">Join us</Heading>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box variant="FormControl">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            name="name"
                            id="name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && errors.name.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please Enter Your Name!
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            id="email"
                            {...register(
                                "email",
                                {
                                    required: "Please enter an email addreess!",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "The email you enter is invalid email!",
                                    },
                                },
                                { required: true }
                            )}
                        />
                        {errors.email && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.email.message}
                            </Paragraph>
                        )}
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
                                        required: "You must specify a password",
                                        pattern: {
                                            value: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
                                            message: "Password must contain at least one letter and Number!"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        },

                                    },
                                    { required: true }
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
                    <Box variant="FormControl">
                        <Box sx={{ position: "relative" }}>
                            <Label htmlFor="password_repeat">Repeat Password</Label>
                            <Input
                                name="password_repeat"
                                type={show.passConf ? "text" : "password"}
                                id="password_repeat"
                                {...register(
                                    "password_repeat",
                                    {
                                        validate: value =>
                                            value === password || "The passwords do not match"
                                    }
                                )}
                            />
                            <Box sx={styles.Eyes} onClick={() => handleShow("passconfirm")}>
                                {!show.passConf &&
                                    < Icons icon="ant-design:eye-filled" />
                                }
                                {show.passConf &&
                                    <Icons icon="ant-design:eye-invisible-filled" />
                                }
                            </Box>
                        </Box>
                        {errors.password_repeat && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.password_repeat.message}
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
                                        "picture",
                                        {
                                            required: "You must give one profile picture!"
                                        }
                                    )}
                                    onChange={onAvatar}
                                />
                                <Label htmlFor="picture">Choose Avatar</Label>
                            </Box>
                        </Flex>
                        {errors.picture && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.picture.message}
                            </Paragraph>
                        )}
                    </Box>
                    <Box>
                        <Button variant="SubmitButtons" type='submit'>
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="Loading" /> : "Singup"
                            }
                        </Button>
                    </Box>
                </Box>
                <Box sx={styles.Already}>
                    <Paragraph>Already have account? <Link href="/login">Login</Link></Paragraph>
                </Box>
            </Box>
        </Container>
    );
};
export default Signup;

// Stylesheets
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
        bottom: "-2%",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}
//Serverside Data fetching and redirection
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (context) => {
            const auth = await store.dispatch(authCheck(context.req.cookies['token']));
            if (auth) {
                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
        }
)