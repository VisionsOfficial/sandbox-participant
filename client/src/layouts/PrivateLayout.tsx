import { APIClientProvider } from "react-api-client-provider";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { SESSION_STORAGE_KEY } from "../constants/storeKeys";
import { APP_LINK } from "../constants/appLinks";
import { Loader } from "../components/atoms/Loaders/Loader/Loader";
import { SocketProvider } from "../contexts/SocketProvider";

export const PrivateLayout = () => {
    const { session, initializing } = useAuth();

    const ifPrevLocation = (sessionKey: string) => {
        const prevLoc = sessionStorage.getItem(sessionKey);
        if (!prevLoc) return;
        sessionStorage.removeItem(sessionKey);
        return <Navigate to={prevLoc} />;
    };

    if (initializing) {
        return <Loader />;
    }

    if (!session) {
        return <Navigate to={APP_LINK.public.home} />;
    }

    ifPrevLocation(SESSION_STORAGE_KEY.locationBeforeError);
    ifPrevLocation(SESSION_STORAGE_KEY.locationBeforeSessionExpiration);

    return (
        <APIClientProvider>
            <SocketProvider>
                <Outlet />
            </SocketProvider>
        </APIClientProvider>
    );
};
