import { PropsWithChildren } from "react";
import Styles from "./ProfileIcon.module.scss";
import { useAuth } from "../../../../auth/AuthProvider";

type ProfileIconProps = {};

export const ProfileIcon = ({}: PropsWithChildren<ProfileIconProps>) => {
    const { session } = useAuth();
    if (!session) return null;

    const className = session.user.oauth.google.picture
        ? Styles.ProfileIcon
        : Styles.ProfileIconLetter;

    return (
        <div className={className}>
            {session.user.oauth.google.picture ? (
                <img src={session.user.oauth.google.picture} />
            ) : (
                session.user.email.charAt(0).toUpperCase()
            )}
        </div>
    );
};
