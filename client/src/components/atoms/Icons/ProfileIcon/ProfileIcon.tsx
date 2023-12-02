import { PropsWithChildren } from "react";
import Styles from "./ProfileIcon.module.scss";
import { useAuth } from "../../../../auth/AuthProvider";

type ProfileIconProps = {};

export const ProfileIcon = ({}: PropsWithChildren<ProfileIconProps>) => {
    const { session } = useAuth();
    if (!session) return null;
    return (
        <div className={Styles.ProfileIcon}>
            {session.user.email.charAt(0).toUpperCase()}
        </div>
    );
};
