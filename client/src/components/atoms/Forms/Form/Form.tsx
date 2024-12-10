import { PropsWithChildren } from "react";
import Styles from "./Form.module.scss";
import { FormPropsType } from "../../../../types/genericComponentProps";

type FormProps = FormPropsType & {
    enabled?: boolean;
};

export const Form = (props: PropsWithChildren<FormProps>) => {
    const { enabled, children, ...rest } = props;

    return (
        <form className={Styles.Form} {...rest}>
            {children}
        </form>
    );
};
