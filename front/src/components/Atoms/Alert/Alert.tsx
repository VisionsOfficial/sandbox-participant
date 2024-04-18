import React, { PropsWithChildren } from "react";
import Styles from "./Alert.module.scss";

type AlertProps = {
    type: "error" | "warning" | "success";
    variant?: "background" | "text";
    className?: string;
    style?: React.CSSProperties;
};

export const Alert = ({
    type,
    variant = "background",
    className = "",
    style,
    children,
}: PropsWithChildren<AlertProps>) => {
    const setIcon = () => {
        switch (type) {
            case "error":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-alert-circle"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                );
            case "warning":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-alert-triangle"
                    >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                );
                break;
            case "success":
                break;

            default:
                return null;
        }
    };

    const setVariantPerType = () => {
        switch (type) {
            case "error":
                switch (variant) {
                    case "background":
                        return Styles.errorBg;

                    default:
                        return "";
                }

            case "warning":
                switch (variant) {
                    case "background":
                        return Styles.warningBg;

                    default:
                        return "";
                }

            default:
                return "";
        }
    };

    return (
        <div
            className={`${Styles.Alert} ${
                Styles[type]
            } ${setVariantPerType()} ${className}`}
            style={{ ...style }}
        >
            {setIcon()}
            <p>{children}</p>
        </div>
    );
};
