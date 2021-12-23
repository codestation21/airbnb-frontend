/** @jsxImportSource theme-ui */
import { useEffect, useState } from "react";
import { Container, Heading, Image } from "theme-ui";
import GoogleMapReact from 'google-map-react';
import { useSelector } from "react-redux";

const ResMaps = () => {
    const { rooms } = useSelector(state => state.roomsByFilter);
    return (
        <Container sx={{ ...styles.Container, height: `${rooms.length > 4 ? "100%" : "34.7em"}` }} className="Consfhru">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDjWhzUDaHME8Shc1Xa76tTwul5vNGZ-2E" }}
                defaultCenter={{ lat: Number(rooms[0].lat), lng: Number(rooms[0].lng) }}
                center={{ lat: Number(rooms[0].lat), lng: Number(rooms[0].lng) }}
                margin={[50, 50, 50, 50]}
                defaultZoom={10}
            >
                {rooms.map((room, i) => (
                    <div
                        key={i}
                        lat={Number(room.lat)}
                        lng={Number(room.lng)}
                        sx={styles.MapImageContainer}
                    >
                        <Image
                            sx={styles.MapImages}
                            src={room.images[0].url}
                            alt="Images"
                        />
                        <Heading sx={styles.MapPrice} as="h3">${room.price}</Heading>
                    </div>
                ))
                }
            </GoogleMapReact>
        </Container>
    );
};
export default ResMaps;

const styles = {
    Container: {
        width: "100%",
        mb: "20px",
        div: {
            borderRadius: "10px"
        }
    },
    MapImageContainer: {
        position: "relative",
        width: "125px",
        height: "65px",
        cursor: "pointer",
        zIndex: "999",
        "&:hover": {
            zIndex: "9999"
        },
        "&:after": {
            content: '""',
            background: "linear-gradient(rgba(0, 0, 0, 0) 0%, #000 100%)",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            borderRadius: "10px"
        },
        "&:before": {
            content: '""',
            position: "absolute",
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "12px solid black",
            bottom: "-11.5px",
            left: "10px"
        }
    },
    MapImages: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "10px"
    },
    MapPrice: {
        position: "absolute",
        bottom: "10px",
        left: "10px",
        zIndex: "999",
        color: "text",
        fontSize: "20px"
    }
}

