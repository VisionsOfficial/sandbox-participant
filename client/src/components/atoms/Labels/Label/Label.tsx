import { PropsWithChildren } from "react";
import Styles from "./Label.module.scss";

type LabelProps = React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
> & {};

export const Label = (props: PropsWithChildren<LabelProps>) => {
    const { children, ...rest } = props;
    return (
        <label className={Styles.Label} {...rest}>
            {children}
        </label>
    );
};
