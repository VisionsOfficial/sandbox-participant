import React, { PropsWithChildren } from "react";
import Styles from "./ChevronDownSVG.module.scss";

type ChevronDownSVGProps = {
    className?: string;
    style?: React.CSSProperties;
};

export const ChevronDownSVG = ({
    className = "",
    style,
}: PropsWithChildren<ChevronDownSVGProps>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${Styles.ChevronDownSVG} ${className}`}
            style={{ ...style }}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};
