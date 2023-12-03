import { PropsWithChildren } from "react";
import Styles from "./FooterNav.module.scss";
import { useAuth } from "../../../../auth/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { useBreakpoint } from "../../../../contexts/BreakpointProvider";
import { Link } from "react-router-dom";
import { APP_LINK } from "../../../../constants/appLinks";

type FooterNavProps = {};

export const FooterNav = (props: PropsWithChildren<FooterNavProps>) => {
    const { session } = useAuth();
    const { resolution } = useBreakpoint();

    if (!session) return null;
    if (resolution !== "mobile") return null;

    return (
        <div className={Styles.FooterNav}>
            <Link to={APP_LINK.private.home}>
                <FontAwesomeIcon icon={faHome} />
            </Link>
            <Link to={APP_LINK.private.profile}>
                <FontAwesomeIcon icon={faUser} />
            </Link>
        </div>
    );
};
