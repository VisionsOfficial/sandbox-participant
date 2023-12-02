import { PropsWithChildren } from "react";
import { Input } from "../Input/Input";
import Styles from "./FormInput.module.scss";
import { Label } from "../../Labels/Label/Label";

type FormInputProps = {
    label: string;
    errorMessage?: string;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export const FormInput = (props: PropsWithChildren<FormInputProps>) => {
    const { label, errorMessage, ...rest } = props;
    const { required } = rest;
    return (
        <div className={Styles.FormInput}>
            <Label>
                {label}
                {required && <span className={Styles.Required}>*</span>}
            </Label>
            <Input {...rest} className={required ? Styles.Required : ""} />
            {errorMessage && (
                <p className={Styles.ErrorMessage}>{errorMessage}</p>
            )}
        </div>
    );
};
