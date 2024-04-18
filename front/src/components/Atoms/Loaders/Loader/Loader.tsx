import Styles from "./Loader.module.scss";

type LoaderProps = {
    sizing?: number;
    variant?: "light" | "dark";
    className?: string;
};

export const Loader = ({
    sizing,
    variant = "dark",
    className = "",
}: LoaderProps) => {
    return (
        <span
            className={`${Styles.Loader} ${
                variant === "dark" ? Styles.dark : ""
            } ${className}`}
            style={sizing ? { width: sizing, height: sizing } : {}}
        ></span>
    );
};
