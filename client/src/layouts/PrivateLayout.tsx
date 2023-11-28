import { APIClientProvider } from "react-api-client-provider";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { AppLinks } from "../config/links.config";
import { SessionStorageKeys } from "../config/storage.config";

export const PrivateLayout = () => {
    const { user } = useAuth();

    console.log(user);

    const ifPrevLocation = (sessionKey: string) => {
        const prevLoc = sessionStorage.getItem(sessionKey);
        if (!prevLoc) return;
        sessionStorage.removeItem(sessionKey);
        return <Navigate to={prevLoc} />;
    };

    if (!user) {
        return <Navigate to={AppLinks.public.home} />;
    }

    ifPrevLocation(SessionStorageKeys.locationBeforeError);
    ifPrevLocation(SessionStorageKeys.locationBeforeSessionExpiration);

    return (
        <APIClientProvider>
            <Outlet />
        </APIClientProvider>
    );
};
