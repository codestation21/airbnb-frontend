/** @jsxImportSource theme-ui */
//Responsive Design
// Package Installation
import Heads from "utilis/Heads";
import Hero from "sections/Index/Hero";
import Locations from "sections/Index/Locations";
import Home from "sections/Index/Home";
import { useSelector } from "react-redux";

//Components and  Function
import { getRooms, getRoomsByDhaka, getRoomsBySylhet } from "redux/actions/roomActions";
import { authCheck, getUser } from "redux/actions/userActions";
import { wrapper } from "redux/store";

// Data and Images
import Europe from "data/Europe";
import Asia from "data/Asia";
import BackImage from "assets/Homes1.svg";
import BackImage2 from "assets/Homes2.svg";

export default function Index() {
    //Redux Data Apply
    const roomDhaka = useSelector(state => state.roomByDhaka);
    const roomSylhet = useSelector(state => state.roomBySylhet);
    return (
        <>
            <Heads
                title="Real State Management System"
            />
            <Hero />
            <Locations
                locations={Europe}
                sectionHeading="Discover Europe"
                url="/"
                imageStyle={styles.FirtSectionImage}
                contentStyle={styles.FirstSliderContent}
            />
            <Home
                Rooms={roomDhaka}
                url="/search/searchresult/?location=dhaka"
                cityName="Dhaka"
                BackImage={BackImage}
            />
            <Locations
                locations={Asia}
                sectionHeading="Discover Asia"
                url="/"
                imageStyle={styles.SecondSectionImage}
                contentStyle={styles.SecondSliderContent}
            />
            <Home
                Rooms={roomSylhet}
                url="/search/searchresult/?location=barishal"
                cityName="Barish"
                BackImage={BackImage2}
            />
        </>
    )
}

//Stylessheet
const styles = {
    FirtSectionImage: {
        height: ["300px", "350px", "400px", "500px"]
    },
    SecondSectionImage: {
        height: "200px"
    },
    FirstSliderContent: {
        bottom: ["50%", "58%", "65%", "30%", "26%"],
        right: "-35%",
    },
    SecondSliderContent: {
        bottom: ["68%", "85%", "120%", null, "60%", null, "68%"],
        right: "-36%",
    }
}
//Server side data fetching
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
            await store.dispatch(getRooms(context.req.cookies['token']));
            await store.dispatch(getRoomsByDhaka(context.req.cookies['token']));
            await store.dispatch(getRoomsBySylhet(context.req.cookies['token']));
            await store.dispatch(getUser(context.req.cookies['token']));
        }
)