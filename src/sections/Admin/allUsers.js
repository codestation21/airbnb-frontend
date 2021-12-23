/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { Button, Container, Flex, Box } from "theme-ui";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from 'material-table';

import { userAdminDelete, clearErrors } from "redux/actions/adminAction";
import Icons from 'utilis/Icons';

const AllUsers = () => {
    const { users } = useSelector(state => state.getAllUser);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const Router = useRouter();
    const { success, message } = useSelector(state => state.userDelete);
    const data = [];
    users && users.forEach(user => {
        data.push({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            action:
                <>
                    <Flex>
                        <Link href={`/admin/user/edituser/${user.id}`}>
                            <a sx={styles.EyeButton}><Icons icon="fa-solid:pencil-alt" /></a>
                        </Link>
                        <Button
                            sx={styles.DownloadButton}
                            onClick={() => dispatch(userAdminDelete(user.id))}
                        >
                            <Icons icon="fa-solid:trash-alt" />
                        </Button>
                    </Flex>
                </>

        })
    })
    const columns = [
        { title: 'User ID', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Email', field: 'email' },
        { title: 'Role', field: 'role' },
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
            Router.push('/admin/users');
        }
    }, [dispatch, success])
    return (
        <Container px={"80px"} pt={"45px"} sx={styles.BookingContainer}>
            <MaterialTable
                columns={columns}
                data={data}
                title={`${users ? users.length : 0} Users`}
            />
            {error &&
                <Box
                    sx={{
                        ...styles.Message,
                        bg: "#FFBABA",
                        color: "#D8000C"
                    }}
                >{message}</Box>
            }
        </Container>
    );
};
export default AllUsers;

const styles = {
    BookingContainer: {
        ".MuiPaper-elevation2": {
            boxShadow: "none"
        },
        ".MuiTypography-h6": {
            fontSize: "2rem"
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
    Message: {
        width: "max-content",
        mx: "auto",
        transform: "translateY(-55px)",
        fontSize: "16px",
        padding: "6px 25px",
        borderRadius: "5px"
    }
}