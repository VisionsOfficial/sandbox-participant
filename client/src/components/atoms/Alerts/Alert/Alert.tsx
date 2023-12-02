import { PropsWithChildren } from "react";
import Styles from "./Alert.module.scss";

type AlertProps = {
    type: "success" | "info" | "warning" | "error";
};

export const Alert = (props: PropsWithChildren<AlertProps>) => {
    const { type, children } = props;

    const classNames = `${Styles.Alert} ${Styles[type]}`;

    return <div className={classNames}>{children}</div>;
};
