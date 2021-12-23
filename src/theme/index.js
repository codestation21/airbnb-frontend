export default {
    colors: {
        text: "#FFFFFF", //White- All Text Color
        text_primary: "#000000", // Black- SectionHeading and Card Text Color
        text_secondary: "#DADADA", // Alto - BlurEffect Text Color
        text_tartiary: "#757575", //Boulder - Star And Some text color
        text_quaternary: "#FF5A5F", //Pinky- All other page primary color
        primary: 'transparent', // Transparent- Button background color
        background: "#FFFFFF", //White- Body Background Color
        backround_primary: "rgba(0, 0, 0, 0.7)", // Black - with 0.7 opacity
        backround_primary_2: "rgba(0, 0, 0, 0.4)", // Black - with 0.4 opacity
        backround_primary_3: "rgba(171, 171, 171, 0.38)", // whity - with 0.38 opacity
        backround_primary_4: "rgba(96, 96, 96, 0.34)", // darky-whity - with 0.34 opacity
        backround_primary_5: "rgba(157, 157, 157, 0.33)", // darky-whity - with 0.33 opacity
        backround_secondary: "#008489", //Teal- Notification Dot Color
    },
    breakpoints: [
        '360px', '480px', '640px', '720px', '1080px', '1200px'
    ],
    fonts: {
        body: "'Roboto', sans-serif",
        heading: "'Roboto', sans-serif",
        monospace: "'Roboto', sans-serif",
    },
    fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        black: 900
    },
    alerts: {
        primary: {
            color: 'text',
            bg: 'text_quaternary',
        }
    },
    Embla: {
        overflow: "hidden"
    },
    EmblaContainer: {
        display: "flex"
    },
    EmblaSlider: {
        position: "relative",
        flex: "0 0 100%"
    },
    SubmitButtons: {
        bg: "text_quaternary",
        width: "100%",
        fontSize: "18px",
        fontWeight: 500,
        my: "8px",
        cursor: "pointer",
        height: "40px"
    },
    ErrorMessage: {
        color: "red",
        mt: "5px",
        fontSize: "15px",
        svg: {
            mb: "-2px",
            mr: "5px"
        }
    },
    DataFetchError: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: 500,
        paddingBottom: "20px",
        color: "red"
    },
    FormContainer: {
        bg: "background",
        width: ["95%", "90%", "85%", "70%", "60%", "40%", "35%", "32%"],
        p: ["1rem 1.5rem", "1.1rem 1.6rem", null, "2rem 2.8rem"],
        m: "0 auto",
        boxShadow: "0 0 30px #00000029",
        borderRadius: "10px"
    },
    UploadFormContainer: {
        bg: "background",
        width: "50%",
        p: ["1rem 1.5rem", "1.1rem 1.6rem", null, "2rem 2.8rem"],
        m: "0 auto",
        boxShadow: "0 0 30px #00000029",
        borderRadius: "10px"
    },
    Title: {
        fontSize: "30px",
        fontWeight: "regular",
        mb: "1rem"
    },
    FormControl: {
        mb: "10px",
        label: {
            fontSize: "16px",
            mb: "5px"
        },
        input: {
            borderColor: "#00000024",

            "&:focus": {
                outline: "none"
            },
            "&::-ms-reveal, &::-ms-clear": {
                display: "none"
            }
        },
        textarea: {
            borderColor: "#00000024",
            "&:focus": {
                outline: "none"
            },
            "&::-ms-reveal, &::-ms-clear": {
                display: "none"
            }
        },
        select: {
            borderColor: "#00000024",
            "&:focus": {
                outline: "none"
            },
            "&::-ms-reveal, &::-ms-clear": {
                display: "none"
            }
        }
    },
    styles: {
        root: {
            fontFamily: "body"
        },
        a: {
            textDecoration: "none",
            color: "black"
        }
    }
}