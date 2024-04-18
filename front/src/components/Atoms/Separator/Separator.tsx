import React, { PropsWithChildren } from "react";
import Styles from "./Separator.module.scss";

type SeparatorProps = {
    className?: string;
    classNames?: { separator?: string; text?: string };
    vertical?: boolean;
    orientation?: "left" | "center" | "right";
    style?: React.CSSProperties;
};

export const Separator = ({
    className = "",
    classNames = { separator: "", text: "" },
    vertical = false,
    orientation = "center",
    style,
    children,
}: PropsWithChildren<SeparatorProps>) => {
    return (
        <div
            className={`${Styles.Separator} ${className} ${
                classNames.separator
            } ${vertical ? Styles.vertical : ""} ${
                children ? Styles.SeparatorText : ""
            } ${Styles[orientation]}`}
            style={{ ...style }}
        >
            {children && (
                <span className={`${Styles.text} ${classNames.text}`}>
                    {children}
                </span>
            )}
        </div>
    );
};
