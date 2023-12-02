import { APIClientProvider } from "react-api-client-provider";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { SESSION_STORAGE_KEY } from "../constants/storeKeys";
import { APP_LINK } from "../constants/appLinks";

export const PrivateLayout = () => {
    const { session } = useAuth();

    const ifPrevLocation = (sessionKey: string) => {
        const prevLoc = sessionStorage.getItem(sessionKey);
        if (!prevLoc) return;
        sessionStorage.removeItem(sessionKey);
        return <Navigate to={prevLoc} />;
    };

    if (!session) {
        return <Navigate to={APP_LINK.public.home} />;
    }

    ifPrevLocation(SESSION_STORAGE_KEY.locationBeforeError);
    ifPrevLocation(SESSION_STORAGE_KEY.locationBeforeSessionExpiration);

    return (
        <APIClientProvider>
            <Outlet />
        </APIClientProvider>
    );
};
