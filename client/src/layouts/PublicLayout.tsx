import { useAuth } from "../contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/app/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
