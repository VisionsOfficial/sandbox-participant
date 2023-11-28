import { PropsWithChildren } from "react";
import Styles from "./DashboardPage.module.scss";

type DashboardPageProps = {};

export const DashboardPage = (props: PropsWithChildren<DashboardPageProps>) => {
    return (
        <div className={Styles.DashboardPage}>
            <h1>Dashboard Page</h1>
        </div>
    );
};
