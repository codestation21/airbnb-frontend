/** @jsxImportSource theme-ui */
// Responsive Design
// Package Instlattion
import Heads from "utilis/Heads";
import { Box, Button, Container, Flex, Heading, Input, Label, Select, Image } from "theme-ui";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
// Components, media and Functions
import Icons from "utilis/Icons";
import Loader from "assets/Loader.svg";


// Select arrow key 
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

const Filter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [guestColor, setGuestColor] = useState(true);
    const [roomColor, setRoomColor] = useState(true);
    const [sortColor, setSortColor] = useState(true);
    const [loading, setLoading] = useState(false);
    const Router = useRouter();
    const onSubmit = (data) => {
        setLoading(true);
        Router.push(`/search/searchresult/?location=${data.location.trim().replace(/\s+/g, '-').toLowerCase()}&guests=${data.guest}&category=${data.category}&sort=${data.sortby}&price=${data.pricemin}-${data.pricemax}`);
    };
    const geustOnChange = (e) => {
        if (e.target.value === "") {
            setGuestColor(true)
        } else {
            setGuestColor(false)
        }
    }
    const roomOnChange = (e) => {
        if (e.target.value === "") {
            setRoomColor(true)
        } else {
            setRoomColor(false)
        }
    }
    const sortOnChnage = (e) => {
        if (e.target.value === "") {
            setSortColor(true)
        } else {
            setSortColor(false)
        }
    }
    return (
        <Container sx={{ color: "text_primary", p: "4rem 0" }}>
            <Heads title="Search Filter- Real State Management System" />
            <Box variant="FormContainer">
                <Heading variant="Title" as="h3">Search Rooms</Heading>
                <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box variant="FormControl">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            name="location"
                            id="location"
                            placeholder="Type your location..."
                            {...register("location")}
                        />
                    </Box>
                    <Box variant="FormControl">
                        <Label htmlFor="guest">No. of Guests</Label>
                        <Select
                            arrow={customArrowIcon}
                            {...register("guest")}
                            className={guestColor ? "" : "black"}
                            onChange={geustOnChange}
                            sx={styles.SelectIon}
                        >
                            <option value="" default>Select your option...</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Select>
                    </Box>
                    <Box variant="FormControl">
                        <Label htmlFor="category">Room Type</Label>
                        <Select
                            arrow={customArrowIcon}
                            {...register("category")}
                            className={roomColor ? "" : "black"}
                            onChange={roomOnChange}
                            sx={styles.SelectIon}
                        >
                            <option value="" default>Select your option...</option>
                            <option value="king">King</option>
                            <option value="twins">Twins</option>
                            <option value="single">Single</option>
                        </Select>
                    </Box>
                    <Box variant="FormControl">
                        <Label htmlFor="sortby">Sort By</Label>
                        <Select
                            arrow={customArrowIcon}
                            {...register("sortby")}
                            className={sortColor ? "" : "black"}
                            onChange={sortOnChnage}
                            sx={styles.SelectIon}
                        >
                            <option value="" default>Select your option...</option>
                            <option value="desc">Descending</option>
                            <option value="aesc">Ascending</option>
                        </Select>
                    </Box>
                    <Box variant="FormControl">
                        <Label htmlFor="pricemin">Price Range</Label>
                        <Flex>
                            <Input
                                name="pricemin"
                                id="pricemin"
                                type="number"
                                placeholder="Min"
                                {...register("pricemin")}
                            />
                            <Box sx={styles.RangeIcon}>
                                <Icons icon="uil:slider-h-range" />
                            </Box>
                            <Input
                                name="pricemax"
                                id="pricemax"
                                type="number"
                                placeholder="Max"
                                {...register("pricemax")}
                            />
                        </Flex>
                    </Box>
                    <Flex>
                        <Button variant="SubmitButtons" type='submit'>
                            {loading ?
                                <Image sx={styles.Loading} src={Loader} alt="Loading" /> : "Search"
                            }
                        </Button>
                        <Box onClick={() => Router.back()} variant="SubmitButtons" sx={styles.Back} className="back">
                            Back
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Container>
    )
        ;
};
export default Filter;


const styles = {
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
    RangeIcon: {
        mx: "5px",
        flex: ["0 0 14%", "0 0 12%", "0 0 10%"],
        textAlign: "center",
        fontSize: "30px",
        svg: {
            mb: "-4px"
        }
    },
    Loading: {
        width: "21px"
    },
    Back: {
        ml: "10px",
        flex: "0 0 30%",
        background: "#1D91F4",
        borderRadius: "4px",
        textAlign: "center",
        color: "text",
        paddingTop: "9px"
    }
}