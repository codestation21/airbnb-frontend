/** @jsxImportSource theme-ui */
import {Button} from "theme-ui";

export const DotButton = ({selected, onClick}) => (
    <Button
        className={`embla__dot ${selected ? "is-selected" : ""}`}
        type="button"
        onClick={onClick}
    />
);