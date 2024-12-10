import { PropsWithChildren } from "react";
import Styles from "./Link.module.scss";
import ButtonStyles from "../../Buttons/Button/Button.module.scss";

type LinkProps = React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
> & {
    loading?: boolean;
    button?: boolean;
};

export const Link = (props: PropsWithChildren<LinkProps>) => {
    const { loading, button, children, ...rest } = props;

    const classNames = button
        ? `${ButtonStyles.Button} ${rest.className}`
        : `${Styles.Link} ${rest.className}`;

    return <a className={classNames} {...rest}></a>;
};
