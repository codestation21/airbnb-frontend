/** @jsxImportSource theme-ui */
// Responsive Design
// Package Installation
import { useEffect, useState } from "react";
import { Box, Button, Container, Heading, Input, Label, Link, Paragraph, Image } from "theme-ui";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
// Components and Function installation
import { wrapper } from "redux/store";
import { login, clearErrors, authCheck } from "redux/actions/userActions";
import Icons from "utilis/Icons";
import Heads from "utilis/Heads";
import Loader from "assets/Loader.svg";


const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { success, loading, message } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const onSubmit = (data, e) => {
        dispatch(login(data));
        e.target.reset();
    };
    const handleShow = () => {
        setShow(!show)
    }
    useEffect(() => {
        if (!success) {
            if (message) {
                setError(true);
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
        <Container sx={{ color: "text_primary", p: "7.5rem 0" }}>
            <Heads title="Login- Real State Management System" />
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
                <Heading variant="Title" as="h3">Login</Heading>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
                                type={show ? "text" : "password"}
                                {...register(
                                    "password",
                                    {
                                        required: "You must give a password",
                                    },
                                    { required: true }
                                )}
                            />
                            <Box sx={styles.Eyes} onClick={() => handleShow("password")}>
                                {!show &&
                                    < Icons icon="ant-design:eye-filled" />
                                }
                                {show &&
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
                    <Box sx={styles.ForgetPass}>
                        <Link href="/me/password/forgetpassword">Forget Password?</Link>
                    </Box>
                    <Box>
                        <Button variant="SubmitButtons" type='submit'>
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="Loading" /> : "Login"
                            }
                        </Button>
                    </Box>
                    <Box sx={styles.NewUser}>
                        <Link href="/signup">New User?</Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
export default Login;


// stylesheet
const styles = {
    Eyes: {
        position: "absolute",
        right: "10px",
        top: "55%",
        cursor: "pointer"
    },
    ForgetPass: {
        my: "5px",
        textAlign: "right",
        fontSize: "15px"
    },
    NewUser: {
        textAlign: "center",
        fontSize: "16px",
        marginTop: "5px",
        a: {
            color: "text_quaternary"
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
        width: "20px"
    }
}
//Serversider data fatching
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
