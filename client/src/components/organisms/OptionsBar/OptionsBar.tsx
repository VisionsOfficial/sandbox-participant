import { PropsWithChildren } from "react";
import Styles from "./OptionsBar.module.scss";
import { useTheme } from "eztp";
import { Button } from "../../atoms/Buttons/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

type OptionsBarProps = {};

export const OptionsBar = ({}: PropsWithChildren<OptionsBarProps>) => {
    const { theme, toggle } = useTheme();

    return (
        <div className={Styles.OptionsBar}>
            <Button
                onClick={() => {
                    toggle(theme === "light" ? "dark" : "light");
                }}
                circle={20}
            >
                <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </Button>
        </div>
    );
};
