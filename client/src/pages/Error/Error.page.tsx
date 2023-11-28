import { PropsWithChildren } from "react";
import Styles from "./ErrorPage.module.scss";

type ErrorPageProps = {};

export const ErrorPage = (props: PropsWithChildren<ErrorPageProps>) => {
    return <div className={Styles.ErrorPage}>Error</div>;
};
