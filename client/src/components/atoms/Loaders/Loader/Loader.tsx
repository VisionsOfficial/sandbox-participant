import { PropsWithChildren } from "react";
import Styles from "./Loader.module.scss";

type LoaderProps = {
    fixedSize?: number;
};

export const Loader = (props: PropsWithChildren<LoaderProps>) => {
    const { fixedSize } = props;

    return (
        <span
            className={Styles.Loader}
            style={fixedSize ? { width: fixedSize, height: fixedSize } : {}}
        >
            <span
                style={
                    fixedSize
                        ? { width: fixedSize / 3, height: fixedSize / 3 }
                        : {}
                }
            ></span>
        </span>
    );
};
