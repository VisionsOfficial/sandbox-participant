import React, { PropsWithChildren, forwardRef } from "react";
import Styles from "./InputCheckbox.module.scss";
import { Size } from "../../../../types";

type InputCheckboxProps = {
    name: string;
    classNames?: {
        wrapper?: string;
        input?: string;
        label?: string;
        children?: string;
        checkbox?: string;
    };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    size?: Size;
    animation?: "wave" | "none";
};

export const InputCheckbox = forwardRef<
    HTMLInputElement,
    PropsWithChildren<InputCheckboxProps>
>(
    (
        {
            classNames = {
                wrapper: "",
                label: "",
                checkbox: "",
                children: "",
                input: "",
            },
            name,
            size = "small",
            onChange = () => {},
            children,
        }: PropsWithChildren<InputCheckboxProps>,
        ref
    ) => {
        const setClassNamesProps = () => {
            const sizing = {
                small: Styles.smallInputCheckbox,
                middle: Styles.middleInputCheckbox,
                large: Styles.largeInputCheckbox,
            };

            return [
                Styles.checkboxWrapper,
                sizing[size],
                classNames.wrapper,
            ].join(" ");
        };

        return (
            <div className={setClassNamesProps()}>
                <input
                    ref={ref}
                    type="checkbox"
                    id={name}
                    name={name}
                    className={`${Styles.inputCheckbox} ${classNames.input}`}
                    onChange={onChange}
                />
                <label
                    htmlFor={name}
                    className={`${Styles.labelCheckbox} ${classNames.label}`}
                >
                    <span
                        className={`${Styles.customCheckbox} ${classNames.checkbox}`}
                    >
                        <svg viewBox="0 0 12 10" height="10px" width="12px">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                        </svg>
                    </span>
                    <span
                        className={`${Styles.checkboxChildren} ${classNames.children}`}
                    >
                        {children}
                    </span>
                </label>
            </div>
        );
    }
);
