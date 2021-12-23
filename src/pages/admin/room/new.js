/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react";
import { Container, Box, Flex, Heading, Label, Input, Textarea, Paragraph, Image, Button, Select } from "theme-ui";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { wrapper } from "redux/store";
import Heads from "utilis/Heads";
import { authCheck } from "redux/actions/userActions";
import { addRooms, clearErrors } from "redux/actions/adminAction";
import { checkAdmin } from "redux/actions/adminAction";
import Icons from "utilis/Icons";
import Loader from "assets/Loader.svg";


const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const onImages = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                }
            }
            reader.readAsDataURL(file)
        })
    }
    const { success, loading, message } = useSelector(state => state.addRooms);
    const dispatch = useDispatch();
    const Router = useRouter();
    const onSubmit = (data, e) => {
        dispatch(addRooms(data))
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
                Router.push('/admin/rooms');
            }, 2000)
        }
    }, [dispatch, success, Router, message])
    return (
        <Container sx={{ color: "text_primary", p: "4rem 0" }}>
            <Heads title="Create account- Real State Management System" />
            <Box variant="UploadFormContainer">
                <Heading variant="Title" as="h3">New Room</Heading>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            name="name"
                            id="name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && errors.name.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please Enter a room name!
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            name="price"
                            id="price"
                            {...register(
                                "price",
                                {
                                    required: "You have to give a price",
                                    pattern: {
                                        value: /^[0-9\b]+$/,
                                        message: "Price only can contain number!",
                                    },
                                },
                                { required: true }
                            )}
                        />
                        {errors.price && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.price.message}
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            name="description"
                            id="description"
                            rows={6}
                            {...register("description", { required: true })}
                        />
                        {errors.description && errors.description.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please add a description!
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="address">Address</Label>
                        <Input
                            name="address"
                            id="address"
                            {...register("address", { required: true })}
                        />
                        {errors.address && errors.address.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please add a Address!
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="category">Category</Label>
                        <Select
                            id="category"
                            {...register("category", { required: true })}
                        >
                            <option value="" default>Select your option...</option>
                            <option value="king">King</option>
                            <option value="single">Single</option>
                            <option value="twins">Twins</option>
                        </Select>
                        {errors.category && errors.category.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please select category!
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="guest">Guest Capacity</Label>
                        <Select
                            id="guest"
                            {...register("guest", { required: true })}
                        >
                            <option value="" default>Select your option...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Select>
                        {errors.guest && errors.guest.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please select a gauest capacity!
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="baths">Number of Baths</Label>
                        <Select
                            id="baths"
                            {...register("baths", { required: true })}
                        >
                            <option value="" default>Select your option...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Select>
                        {errors.baths && errors.baths.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please select a number of baths!
                            </Paragraph>
                        )}
                    </Box>
                    <Box variant="FormControl" sx={styles.formController}>
                        <Label htmlFor="beds">Number of Beds</Label>
                        <Select
                            id="beds"
                            {...register("beds", { required: true })}
                        >
                            <option value="" default>Select your option...</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Select>
                        {errors.beds && errors.beds.type === "required" && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                Please select a category!
                            </Paragraph>
                        )}
                    </Box>
                    <Label sx={{ ...styles.Label, mt: "10px", mb: "10px" }}>Features</Label>
                    <Flex variant="FormControl" sx={styles.formController}>
                        <input
                            type="checkbox"
                            id="internet"
                            sx={{ mb: "6px" }}
                            {...register("internet")}
                        />
                        <label htmlFor="internet" sx={{ ml: "8px" }}>
                            Internet
                        </label>
                    </Flex>
                    <Flex variant="FormControl" sx={styles.formController}>
                        <input
                            type="checkbox"
                            id="breakfast"
                            sx={{ mb: "6px" }}
                            {...register("breakfast")}
                        />
                        <label htmlFor="breakfast" sx={{ ml: "8px" }}>
                            Breakfast
                        </label>
                    </Flex>
                    <Flex variant="FormControl" sx={styles.formController}>
                        <input
                            type="checkbox"
                            id="airCondition"
                            sx={{ mb: "6px" }}
                            {...register("airCondition")}
                        />
                        <label htmlFor="airCondition" sx={{ ml: "8px" }}>
                            Air Condition
                        </label>
                    </Flex>
                    <Flex variant="FormControl" sx={styles.formController}>
                        <input
                            type="checkbox"
                            id="petAllowed"
                            sx={{ mb: "6px" }}
                            {...register("petAllowed")}
                        />
                        <label htmlFor="petAllowed" sx={{ ml: "8px" }}>
                            Pets Allowed
                        </label>
                    </Flex>
                    <Flex variant="FormControl" sx={styles.formController}>
                        <input
                            type="checkbox"
                            id="roomCleaning"
                            sx={{ mb: "6px" }}
                            {...register("roomCleaning")}
                        />
                        <label htmlFor="roomCleaning" sx={{ ml: "8px" }}>
                            Room Cleaning
                        </label>
                    </Flex>
                    <Box>
                        <Label sx={styles.Label}>Images</Label>
                        <Box sx={styles.FileInput}>
                            <Input
                                type="file"
                                id="picture"
                                multiple
                                {...register(
                                    "picture",
                                    {
                                        required: "You must give atleast one images!"
                                    }
                                )}
                                onChange={onImages}
                            />
                            <Label htmlFor="picture">Choose Images</Label>
                        </Box>
                        <Flex sx={{ mt: "10px", mb: "10px" }}>
                            {images &&
                                images.map((img, i) => (
                                    <Image
                                        src={img}
                                        key={i}
                                        alt="Images Preview"
                                        sx={{ flex: "0 0 14%", mr: "10px", borderRadius: "7px", height: "90px", objectFit: "cover" }}
                                    />
                                ))
                            }
                        </Flex>
                        {errors.picture && (
                            <Paragraph variant="ErrorMessage">
                                <Icons icon="bx:bxs-error" />
                                {errors.picture.message}
                            </Paragraph>
                        )}
                    </Box>
                    <Flex>
                        <Button
                            variant="SubmitButtons"
                            type='submit'
                            className={loading ? "disable" : ""}
                            sx={styles.SubmitButton}
                        >
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="Loding" /> : "Add Room"
                            }
                        </Button>
                        <Link href="/admin/rooms">
                            <a variant="SubmitButtons" sx={styles.BackButton}>Back</a>
                        </Link>
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
export default Signup;

const styles = {
    SubmitButton: {
        "&.disable": {
            pointerEvents: "none",
            opacity: 0.5
        }
    },
    formController: {
        input: {
            color: "#00000091",
        },
        textarea: {
            color: "#00000091",
            border: "1px solid #00000047",
            fontWeight: 500,
            fontFamily: "body",
            letterSpacing: "1px",
            "&:focus": {
                outline: "none"
            }
        },
        select: {
            color: "#00000091",
        }
    },
    BackButton: {
        bg: "#3D84C2",
        ml: "10px",
        textAlign: "center",
        borderRadius: "4px",
        color: "white",
        paddingTop: "9px",
        cursor: "pointer",
        height: "40px",
        mt: "8px",
        px: "25px",
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
                fontSize: "16px",
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
    Message: {
        textAlign: "center",
        mt: "10px",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}
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
            const admin = await store.dispatch(checkAdmin(context.req.cookies['token']));
            if (!admin) {
                return {
                    redirect: {
                        destination: "/",
                        permanent: false
                    }
                }
            }
        }
)