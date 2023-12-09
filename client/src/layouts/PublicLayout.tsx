import { useAuth } from "../auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../components/atoms/Loaders/Loader/Loader";

export const PublicLayout = () => {
    const { session, initializing } = useAuth();

    if (initializing) {
        return <Loader />;
    }

    if (session) {
        return <Navigate to="/app/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
