/** @jsxImportSource theme-ui */
import { useState, useRef, useEffect, useMemo } from "react";
import { Container, Flex, Box, Input, Paragraph } from "theme-ui";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Icons from "utilis/Icons";
import Menu from "utilis/Menu";

const SearchNav = () => {
    const [isVisible, setVisiblity] = useState(false);
    const [search, setSearch] = useState("");
    const [cursor, setCursor] = useState(-1);
    const [error, setError] = useState(false);
    const [suggestions, setSuggestion] = useState([]);

    const { rooms } = useSelector(state => state.initSearch);

    const searchContainer = useRef(null);
    const searchResultRef = useRef(null);
    const textInput = useRef(null);
    const Router = useRouter()
    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.addEventListener("mousedown", handleClickOutside);
        }
    }, []);
    const scrollIntoView = position => {
        if (search) {
            if (suggestions.length > 0) {
                searchResultRef.current.parentNode.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        }
    };
    useEffect(() => {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            return () => {
            };
        }
        if (search) {
            if (suggestions.length > 0) {
                let listItems = Array.from(searchResultRef.current.children);
                listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop - 10);
            }
        }
    }, [cursor]);

    useMemo(() => {
        let mathches = []
        setCursor(-1);
        scrollIntoView(0);
        if (search.length > 0) {
            mathches = rooms.filter(room => {
                const escapeRegExp = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                const regex = new RegExp(escapeRegExp(search), "gi");
                return room.name.match(regex);
            })
        }
        setSuggestion(mathches);
    }, [rooms, search])

    const handleClickOutside = e => {
        if (searchContainer.current && !searchContainer.current.contains(e.target)) {
            hideSuggestion();
        }
    };
    const onSuggestionSelect = (name) => {
        setSearch(name);
        hideSuggestion();
        Router.push(`/search/searchresult/?name=${name.trim().replace(/\s+/g, '-').toLowerCase()}`)
    }
    const onChangeHandler = (e) => {
        setSearch(e.target.value);
        showSuggestion();
    }

    const showSuggestion = () => setVisiblity(true)
    const hideSuggestion = () => setVisiblity(false);
    const keyBoardNav = (e) => {
        if (suggestions) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                isVisible ? setCursor(c => (c < suggestions.length - 1 ? c + 1 : c)) : showSuggestion()
            }
            if (e.key === "ArrowUp") {
                setCursor(c => (c > 0 ? c - 1 : 0))
            }
            if (e.key === "Escape") {
                hideSuggestion();
            }
            if (e.key === "Enter" && cursor >= 0) {
                setSearch(suggestions[cursor].name);
                hideSuggestion();
                Router.push(`/search/searchresult/?name=${suggestions[cursor].name.trim().replace(/\s+/g, '-').toLowerCase()}`)

            }
        }
        if (e.key === "Enter" && !search) {
            setError(true)
        }
        if (e.key === "Enter" && search && cursor < 0) {
            Router.push(`/search/searchresult/?name=${search.trim().replace(/\s+/g, '-').toLowerCase()}`)
        }
    }
    const resetInputField = () => {
        setSearch("");
    };
    useEffect(() => {
        textInput.current.focus();
        if (error) {
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
    }, [error]);
    return (
        <Container as="header" px={["5px", null, "10px", "20px", "30px", "85px"]} py={"5px"}>
            <Flex sx={{ alignItems: "center", flexWrap: "wrap" }}>
                <Box onClick={() => Router.back()} sx={{ cursor: "pointer", flex: ["0 - 5%", null, "0 0 18%",] }}>
                    <Icons icon="bi:arrow-left" sx={{ fontSize: "20px" }} />
                </Box>
                <Box sx={{ position: "relative", flex: ["0 0 95%", null, "0 0 52%"] }} ref={searchContainer}>
                    <Input
                        placeholder="Where are you going?"
                        name="search"
                        type="text"
                        value={search}
                        sx={styles.Input}
                        autoComplete="off"
                        ref={textInput}
                        onClick={showSuggestion}
                        onChange={onChangeHandler}
                        onKeyDown={e => keyBoardNav(e)}
                    />
                    {suggestions.length > 0 &&
                        <Box
                            className={isVisible ? "visible" : ""}
                            sx={styles.SuggestionArea}
                        >
                            <Box ref={searchResultRef} sx={styles.SuggestionContainer}>
                                {suggestions &&
                                    suggestions.map((suggestion, i) => (
                                        <Paragraph
                                            key={i}
                                            onClick={() => onSuggestionSelect(suggestion.name)}
                                            className={cursor === i ? "highlighted" : ""}
                                        >
                                            {suggestion.name}
                                        </Paragraph>
                                    ))
                                }
                            </Box>
                        </Box>
                    }
                    {search &&
                        <Box onClick={resetInputField} sx={styles.CloseIcon}>
                            <Icons icon="maki:cross" />
                        </Box>
                    }
                    {error &&
                        <Box sx={styles.SearchError}>Please enter some value to see search result!</Box>
                    }
                </Box>
                <Box sx={styles.Menu}>
                    <Menu />
                </Box>
            </Flex>
        </Container>
    );
};
export default SearchNav;

const styles = {
    Menu: {
        flex: ["0 0 100%", null, "0 0 30%"],
        mt: ["10px", null, "unset"],
        span: {
            color: "black !important"
        }
    },
    Input: {
        border: "none",
        color: "text_primary",
        fontSize: "18px",
        "&:focus": {
            outline: "none"
        }
    },
    CloseIcon: {
        position: "absolute",
        cursor: "pointer",
        top: "0",
        right: "0",
        bottom: "0",
        width: "36px",
        display: "flex",
        placeItems: "center",
        justifyContent: "center",
        svg: {
            fontSize: "13px"
        }
    },
    SearchError: {
        position: "absolute",
        right: "-45%",
        top: "8px",
        background: "#FFBABA",
        padding: "4px 13px",
        color: "#D8000C",
        borderRadius: "4px"
    },
    SuggestionArea: {
        display: "none",
        bg: "background",
        py: "8px",
        px: "6px",
        position: "absolute",
        width: "103%",
        left: "-8px",
        boxShadow: "0 0 20px #0000001f",
        borderRadius: "6px",
        maxHeight: "34em",
        overflow: "auto",
        zIndex: "9",
        "&.visible": {
            display: "block",
        }
    },
    SuggestionContainer: {
        p: {
            margin: "3px 0",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            "&.highlighted": {
                bg: "#E1E3E5",
            },
            "&:hover": {
                bg: "#E1E3E5",
            }
        }
    }
}
