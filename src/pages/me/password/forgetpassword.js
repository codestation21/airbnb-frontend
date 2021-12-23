/** @jsxImportSource theme-ui */
// Responsive Design
// Package Installation
import { Container, Box, Heading, Label, Input, Paragraph, Image, Button } from "theme-ui";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Icons from "utilis/Icons";
import Heads from "utilis/Heads";

// Components, Media & function
import { wrapper } from "redux/store";
import { authCheck } from "redux/actions/userActions";
import { clearErrors, fotgetPassword } from "redux/actions/profileAction";
import { useEffect, useState } from "react";
import Loader from "assets/Loader.svg";

const ForgetPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const dispatch = useDispatch();
    const { success, loading, message } = useSelector(state => state.updatePorfile);
    const onSubmit = (data, e) => {
        e.target.reset();
        dispatch(fotgetPassword(data))
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
            }, 5000)
        }
    }, [dispatch, success, message])
    return (
        <Container sx={{ color: "text_primary", p: "8rem 0" }}>
            <Heads title="Resetpassword- Real State Management System" />
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
                <Heading variant="Title" as="h3">Reset password</Heading>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box variant="FormControl">
                        <Label htmlFor="email">Enter Email</Label>
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
                    <Box>
                        <Button variant="SubmitButtons" type='submit'>
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="Loading" /> : "Send Email"
                            }
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
export default ForgetPassword;

//stylesheets 
const styles = {
    Message: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "20%",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}
// Server side data fetching
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
