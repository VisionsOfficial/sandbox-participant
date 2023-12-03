import { PropsWithChildren } from "react";
import Styles from "./HorizontalSeparator.module.scss";

type HorizontalSeparatorProps = {};

export const HorizontalSeparator =
    ({}: PropsWithChildren<HorizontalSeparatorProps>) => {
        return <div className={Styles.HorizontalSeparator}></div>;
    };
