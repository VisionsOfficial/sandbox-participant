import React, { PropsWithChildren } from "react";
import Styles from "./Button.module.scss";
import { ButtonShape, ButtonVariant, Size } from "../../../types";
import { Loader } from "../Loaders/Loader/Loader";

type ButtonClassNamesProps = {
    button?: string;
    loader?: string;
    body?: string;
};

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    className?: string;
    classNames?: ButtonClassNamesProps;
    disabled?: boolean;
    loading?: boolean;
    variant?: ButtonVariant;
    size?: Size;
    danger?: boolean;
    shape?: ButtonShape;
    icon?: React.ReactNode;
    endIcon?: boolean;
};

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const {
        className = "",
        classNames = { button: "", loader: "", body: "" },
        disabled = false,
        loading = false,
        variant = "default",
        size = "middle",
        danger = false,
        shape = "default",
        icon,
        endIcon = false,
        children,
        ...rest
    } = props;

    const setProps = () => {
        const sizeProps = {
            large: Styles.buttonLarge,
            middle: Styles.buttonMiddle,
            small: Styles.buttonSmall,
        };

        const variantProps = {
            default: danger ? Styles.buttonDangerDefault : Styles.buttonDefault,
            primary: Styles.buttonPrimary,
            secondary: Styles.buttonSecondary,
            tertiary: Styles.buttonTertiary,
            quaternary: Styles.buttonQuaternary,
            outline: danger ? Styles.buttonDangerOutline : Styles.buttonOutline,
        };

        const shapeProps = {
            default: "",
            circle: Styles.buttonCircle,
            round: Styles.buttonRound,
        };

        return [
            Styles.Button,
            Styles.ButtonLink,
            className,
            classNames.button,
            disabled ? Styles.notAllowed : "",
            sizeProps[size],
            variantProps[variant],
            shapeProps[shape],
        ].join(" ");
    };
    return (
        <button
            {...rest}
            className={setProps()}
            disabled={loading ? loading : disabled}
        >
            {loading && (
                <Loader
                    className={classNames.loader}
                    variant={variant === "outline" ? "dark" : "light"}
                    sizing={18}
                />
            )}
            {icon && !endIcon && icon}
            <span className={classNames.body}>{children}</span>
            {endIcon && icon && icon}
        </button>
    );
};
