/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { Button, Container, Flex, Box } from "theme-ui";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import MaterialTable from "material-table";
import { useRouter } from "next/router";

import { deleteRooms, clearErrors } from "redux/actions/adminAction";
import Icons from "utilis/Icons";


const AllRooms = () => {
    const [error, setError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const dispatch = useDispatch();
    const Router = useRouter();
    const { rooms } = useSelector(state => state.getAdminRooms);
    const { success, loading, message } = useSelector(state => state.deleteRooms);
    const data = [];
    rooms && rooms.forEach(room => {
        data.push({
            id: room.id,
            name: room.name,
            price: room.price,
            category: room.category,
            action:
                <>
                    <Flex>
                        <Link href={`/admin/room/edit/${room.id}`}>
                            <a sx={styles.EyeButton}><Icons icon="fa-solid:pencil-alt" /></a>
                        </Link>
                        <Button
                            sx={styles.DownloadButton}
                            onClick={() => dispatch(deleteRooms(room.id))}
                        >
                            <Icons icon="fa-solid:trash-alt" />
                        </Button>
                    </Flex>
                </>

        })
    })
    const columns = [
        { title: 'Room ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Price / night', field: 'price' },
        { title: 'Category', field: 'category' },
        { title: 'Action', field: 'action' }
    ];
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
    }, [dispatch, success])
    return (
        <Container px={"80px"} pt={"20px"} sx={styles.BookingContainer}>
            <MaterialTable
                columns={columns}
                data={data}
                title={`${rooms ? rooms.length : 0} Rooms`}
            />
            <Box sx={styles.CreateButton}>
                <Link href="/admin/room/new">
                    <a>Create Room</a>
                </Link>
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
        </Container>
    );
};

export default AllRooms;

const styles = {
    BookingContainer: {
        ".MuiPaper-elevation2": {
            boxShadow: "none"
        },
        ".MuiTypography-h6": {
            fontSize: "2rem !important",
            fontWeight: "700"
        },
        "th": {
            fontWeight: "700",
            fontSize: "18px"
        },
        ".Component-horizontalScrollContainer-12": {
            border: "1px solid #00000014",
            borderRadius: "7px"
        }
    },
    EyeButton: {
        bg: "#007BFF",
        px: "15px",
        pt: "9px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer"
    },
    DownloadButton: {
        bg: "text_quaternary",
        px: "15px",
        borderRadius: "5px",
        color: "white",
        ml: "10px",
        cursor: "pointer"
    },
    CreateButton: {
        position: "relative",
        bottom: "36.5px",
        width: "max-content",
        a: {
            textDecoration: "none",
            bg: "text_quaternary",
            color: "text",
            p: "10px 12px",
            borderRadius: "7px",
            fontWeight: 700
        }
    },
    Message: {
        width: "max-content",
        mx: "auto",
        transform: "translateY(-55px)",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    },
    Loading: {
        width: "21px"
    }
}