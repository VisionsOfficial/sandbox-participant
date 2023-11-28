import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    defer,
} from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { ErrorPage } from "./pages/Error/Error.page";
import { PublicLayout } from "./layouts/PublicLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { HomePage } from "./pages/Home/Home.page";
import { DashboardPage } from "./pages/Dashboard/Dashboard.page";

const userLoader = async () => {
    // defer continues rendering and provides data once available
    return defer({
        user: await new Promise((resolve) => {
            const user = localStorage.getItem("user");
            if (!user) {
                localStorage.setItem("user", "null");
                resolve(null);
            }
            resolve(user);
        }),
    });
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout />}
            loader={userLoader}
            errorElement={<ErrorPage />}
        >
            <Route path="/" element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="/app" element={<PrivateLayout />}>
                <Route path="/app" element={<DashboardPage />} />
            </Route>
        </Route>
    )
);
