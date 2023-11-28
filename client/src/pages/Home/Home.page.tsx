import { PropsWithChildren } from "react";
import Styles from "./HomePage.module.scss";

type HomePageProps = {};

export const HomePage = (props: PropsWithChildren<HomePageProps>) => {
    return (
        <div className={Styles.HomePage}>
            <h1>Home Page</h1>
        </div>
    );
};
