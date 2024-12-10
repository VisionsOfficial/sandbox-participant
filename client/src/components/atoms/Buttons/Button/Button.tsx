import { PropsWithChildren } from "react";
import Styles from "./Button.module.scss";
import {
    ButtonPropsType,
    StyleVariantsType,
} from "../../../../types/genericComponentProps";

type ButtonProps = ButtonPropsType & {
    loading?: boolean;

    /**
     * Define the size of the circle button.
     * Setting this prop to any value will set
     * border radius to 100px
     */
    circle?: number;

    /**
     * Controls the type of the button set by the theme
     */
    variant?: StyleVariantsType;
};

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const {
        loading,
        children,
        circle,
        variant = "normal",
        disabled,
        ...rest
    } = props;

    const classNames = `${Styles.Button} ${rest.className} ${Styles[variant]} ${
        circle ? Styles.circle : ""
    } ${disabled ? Styles.disabled : ""}`.trim();
    const style = circle ? { width: circle, height: circle } : {};
    return (
        <button
            className={classNames}
            {...rest}
            disabled={disabled}
            style={{ ...rest.style, ...style }}
        >
            {children}
        </button>
    );
};
