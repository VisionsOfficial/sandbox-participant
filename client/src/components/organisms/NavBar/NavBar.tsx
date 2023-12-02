import Styles from "./NavBar.module.scss";
import { config } from "../../../config/environment.config";
import { Button } from "../../atoms/Buttons/Button/Button";
import { useAuth } from "../../../auth/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { APP_LINK } from "../../../constants/appLinks";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "../../atoms/Icons/ProfileIcon/ProfileIcon";

export const NavBar = () => {
    const { session, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className={Styles.NavBar}>
            <div className={Styles.brand}>{config.appTitle}</div>
            <div className={Styles.nav}>
                <nav></nav>
            </div>
            <div className={Styles.user}>
                <div>
                    <Button
                        onClick={() => {
                            session
                                ? logout()
                                : navigate(APP_LINK.public.login);
                        }}
                    >
                        <FontAwesomeIcon
                            icon={session ? faSignOut : faSignIn}
                        />
                    </Button>
                </div>
                <ProfileIcon />
            </div>
        </div>
    );
};
