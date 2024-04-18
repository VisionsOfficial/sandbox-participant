import React, { useState } from "react";
import Styles from "./Input.module.scss";
import { Alert } from "../../Alert/Alert";

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    rules?: {
        pattern?: string | RegExp;
        errors?: {
            type: string;
            message?: string;
        }[];
    };
    variant?:
        | "default"
        | "primary"
        | "secondary"
        | "tertiary"
        | "quaternary"
        | "danger"
        | "success"
        | "warning";
};

export const Input = (props: InputProps) => {
    const {
        className = "",
        rules,
        variant = "default",
        onChange,
        ...rest
    } = props;
    const [errorPattern, setErrorPattern] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(
        "Please input a correct value"
    );

    const setVariant = () => {
        switch (variant) {
            case "primary":
                return Styles.variantPrimary;

            default:
                return "";
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e) return;
        setErrorPattern(false);

        if (
            rules &&
            rules.pattern &&
            !new RegExp(rules.pattern).test(e?.currentTarget?.value)
        ) {
            const checkPatternInRules = rules?.errors?.find(
                (er) => er?.type === "pattern"
            );

            if (checkPatternInRules && checkPatternInRules.message) {
                setErrorMessage(checkPatternInRules.message);
            }

            setErrorPattern(true);
        }

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <>
            <input
                {...rest}
                className={`${Styles.Input} ${className} ${setVariant()}`}
                onChange={handleChange}
            />
            {errorPattern && <Alert type="error">{errorMessage}</Alert>}
        </>
    );
};
