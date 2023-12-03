import { PropsWithChildren } from "react";
import Styles from "./Col.module.scss";
import { DivPropsType } from "../../../../types/genericComponentProps";

type ColProps = DivPropsType & {};

export const Col = (props: PropsWithChildren<ColProps>) => {
    const { children, ...rest } = props;
    return (
        <div className={Styles.Col} {...rest}>
            {children}
        </div>
    );
};
