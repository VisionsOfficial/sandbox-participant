import { PropsWithChildren } from "react";
import Styles from "./DashboardPage.module.scss";
import { Link } from "react-router-dom";
import { AppLinks } from "../../config/links.config";

type DashboardPageProps = {};

export const DashboardPage = (props: PropsWithChildren<DashboardPageProps>) => {
    return (
        <div className={Styles.DashboardPage}>
            <h1>Dashboard Page</h1>
            <Link to={AppLinks.private.examples.todos}>Examples Todos</Link>
        </div>
    );
};
