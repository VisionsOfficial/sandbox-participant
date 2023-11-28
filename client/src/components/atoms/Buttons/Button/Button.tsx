import { PropsWithChildren } from "react";
import Styles from "./Button.module.scss";

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    loading?: boolean;
};

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const { loading, children, ...rest } = props;

    const classNames = `${Styles.Button} ${rest.className}`;
    return <button className={classNames} {...rest}>{children}</button>;
};
