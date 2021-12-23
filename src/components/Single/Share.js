/** @jsxImportSource theme-ui */
import {useState, useRef, useEffect} from "react";
import {Box, Button, Paragraph} from "theme-ui";
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    PinterestShareButton,
    PinterestIcon,
    TumblrShareButton,
    TumblrIcon,
    TwitterShareButton,
    TwitterIcon
} from "react-share";

import Icons from "utilis/Icons";

const Share = () => {
    const ref = useRef();
    const [share, setShare] = useState(false);
    const handleShare = () => {
        setShare(!share)
    }
    useOnClickOutside(ref, () => setShare(false));
    return (
        <Box ref={ref} sx={{position: "relative"}}>
            <Button sx={styles.Buttons} onClick={handleShare}>
                <Icons icon="ic:sharp-share"/>
            </Button>
            <Box sx={styles.Icontray} className={`${share ? "active" : ""}`}>
                <FacebookShareButton url="https://youtu.be/Of54Nhig6DE">
                    <FacebookIcon size={50} round={true}/>
                </FacebookShareButton>
                <LinkedinShareButton url="https://youtu.be/Of54Nhig6DE">
                    <LinkedinIcon size={50} round={true}/>
                </LinkedinShareButton>
                <PinterestShareButton
                    url="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    media="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60">
                    <PinterestIcon size={50} round={true}/>
                </PinterestShareButton>
                <TumblrShareButton url="https://youtu.be/Of54Nhig6DE">
                    <TumblrIcon size={50} round={true}/>
                </TumblrShareButton>
                <TwitterShareButton url="https://youtu.be/Of54Nhig6DE">
                    <TwitterIcon size={50} round={true}/>
                </TwitterShareButton>
            </Box>
        </Box>
    );
};
export default Share;

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
};

const styles = {
    Buttons: {
        color: "text_primary",
        textAlign: "center",
        cursor: "pointer",
        svg: {
            fontSize: "22px",
            opacity: 0.4
        },
        p: {
            fontSize: "15px",
            opacity: 0.7
        }
    },
    Icontray: {
        position: "absolute",
        background: "white",
        boxShadow: "0 0 20px #0000002e",
        p: "16px",
        borderRadius: "10px",
        right: "-8px",
        width: "5.5rem",
        display: "none",
        button: {
            mx: "6px"
        },
        "&.active": {
            display: "block"
        }
    }
}
