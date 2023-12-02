import { useAuth } from "../auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
    const { session } = useAuth();

    if (session) {
        return <Navigate to="/app/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
