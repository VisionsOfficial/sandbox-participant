import React from "react";
import Styles from "./CloseSVG.module.scss";

type CloseSVGProps = {
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLOrSVGElement>) => void;
};

export const CloseSVG = ({
    className = "",
    onClick = () => {},
}: CloseSVGProps) => {
    return (
        <div className={Styles.CloseSVG}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${Styles.CloseSVG} ${className}`}
                onClick={onClick}
            >
                <path
                    d="M20.4896 20.4896C25.1779 15.8012 25.1779 8.19988 20.4896 3.51152C15.8012 -1.17684 8.19988 -1.17684 3.51152 3.51152C-1.17684 8.19988 -1.17684 15.8012 3.51152 20.4896C8.19988 25.1779 15.8012 25.1779 20.4896 20.4896Z"
                    fill="black"
                    fillOpacity="0.84"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0495 15.2133L15.2133 11.0495L18.4978 7.76493C19.1201 7.1426 19.1201 6.12454 18.4978 5.50221C17.8755 4.87988 16.8574 4.87988 16.2351 5.50221L12.9505 8.78668L8.78668 12.9505L5.50221 16.2351C4.87988 16.8574 4.87988 17.8755 5.50221 18.4978C6.12454 19.1201 7.1426 19.1201 7.76493 18.4978L11.0495 15.2133Z"
                    fill="white"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.2133 12.9505L11.0495 8.78668L7.76493 5.50221C7.1426 4.87988 6.12454 4.87988 5.50221 5.50221C4.87988 6.12454 4.87988 7.1426 5.50221 7.76493L8.78668 11.0495L12.9505 15.2133L16.2351 18.4978C16.8574 19.1201 17.8755 19.1201 18.4978 18.4978C19.1201 17.8755 19.1201 16.8574 18.4978 16.2351L15.2133 12.9505Z"
                    fill="white"
                />
            </svg>
        </div>
    );
};
