import { PropsWithChildren } from "react";
import Styles from "./FooterNav.module.scss";

type FooterNavProps = {};

export const FooterNav = (props: PropsWithChildren<FooterNavProps>) => {
    return (
        <div className={Styles.FooterNav}>
            <div>A</div>
            <div>B</div>
        </div>
    );
};
