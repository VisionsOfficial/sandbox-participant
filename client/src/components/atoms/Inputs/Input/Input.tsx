import { PropsWithChildren } from "react";
import Styles from "./Input.module.scss";

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {};

export const Input = (props: PropsWithChildren<InputProps>) => {
    const { children, ...rest } = props;
    return (
        <input className={Styles.Input} {...rest}>
            {children}
        </input>
    );
};
