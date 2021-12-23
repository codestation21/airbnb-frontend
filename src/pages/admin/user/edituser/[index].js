/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Box, Flex, Heading, Label, Input, Paragraph, Select, Button, Image } from "theme-ui";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { userAdminUpdate, clearErrors } from "redux/actions/adminAction";
import Heads from "utilis/Heads";
import Loader from "assets/Loader.svg";
import Icons from "utilis/Icons";


const customArrowIcon = <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentcolor"
    sx={{
        ml: -28,
        alignSelf: 'center',
        pointerEvents: 'none',
        color: "#767676"
    }}>
    <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
</Box>

const EditUser = () => {
    const { success, loading, message } = useSelector(state => state.userAdminUpdate);
    const [roleColor, setRoleColor] = useState(true);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const Router = useRouter();
    const onSubmit = (data, e) => {
        dispatch(userAdminUpdate(data, Router.query.index))
    };
    const roleOnChange = (e) => {
        if (e.target.value === "") {
            setRoleColor(true)
        } else {
            setRoleColor(false)
        }
    }
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
                Router.push('/admin/users');
            }, 1000)
        }
    }, [dispatch, success, Router, message])
    return (
        <Container sx={{ color: "text_primary", p: "6rem 0" }}>
            <Heads title="Admin- Real State Management System" />
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
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            id="email"
                            {...register(
                                "email",
                                {
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "The email you enter is invalid email!",
                                    },
                                }
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
                        <Label htmlFor="role">Role</Label>
                        <Select
                            arrow={customArrowIcon}
                            id="role"
                            {...register("role")}
                            className={roleColor ? "" : "black"}
                            onChange={roleOnChange}
                            sx={styles.SelectIon}
                        >
                            <option value="" default>Select your option...</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Select>
                    </Box>
                    <Flex>
                        <Button variant="SubmitButtons" type='submit'>
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="loding" /> : "Save Changes"
                            }
                        </Button>
                        <Button sx={styles.CancelButton}>
                            <Link href="/admin/users">
                                <a>Cancel</a>
                            </Link>
                        </Button>
                    </Flex>
                </Box>
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
            </Box>
        </Container>
    );
};

export default EditUser;


const styles = {
    Message: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: "16%",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    SelectIon: {
        color: '#767676',
        cursor: "pointer",
        option: {
            color: "black"
        },
        "&.black": {
            color: "black"
        }
    },
    Loading: {
        width: "21px"
    },
    CancelButton: {
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