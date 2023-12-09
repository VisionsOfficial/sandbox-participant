import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout";
import { ErrorPage } from "./pages/Error/Error.page";
import { PublicLayout } from "./layouts/PublicLayout";
import { PrivateLayout } from "./layouts/PrivateLayout";
import { HomePage } from "./pages/Home/Home.page";
import { DashboardPage } from "./pages/Dashboard/Dashboard.page";
import { ExampleTodosPage } from "./pages/Examples/ExampleTodos/ExampleTodos.page";
import { APP_LINK } from "./constants/appLinks";
import { ExampleTodoPage } from "./pages/Examples/ExampleTodo/ExampleTodo.page";
import { SignInPage } from "./pages/Auth/SignIn/SignIn.page";
import { SignUpPage } from "./pages/Auth/SignUp/SignUp.page";
import { ExampleSocketIOPage } from "./pages/Examples/ExampleSocketIO/ExampleSocketIO.page";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            element={<AuthLayout />}
            errorElement={<AuthLayout errorElement={<ErrorPage />} />}
        >
            <Route path={APP_LINK.public.home} element={<PublicLayout />}>
                <Route path={APP_LINK.public.home} element={<HomePage />} />
                <Route path={APP_LINK.public.login} element={<SignInPage />} />
                <Route
                    path={APP_LINK.public.register}
                    element={<SignUpPage />}
                />
            </Route>

            <Route path={APP_LINK.private.home} element={<PrivateLayout />}>
                <Route
                    path={APP_LINK.private.home}
                    element={<DashboardPage />}
                />
                <Route
                    path={APP_LINK.private.examples.todos}
                    element={<ExampleTodosPage />}
                />
                <Route
                    path={APP_LINK.private.examples.todo()}
                    element={<ExampleTodoPage />}
                />
                <Route
                    path={APP_LINK.private.examples.socketio}
                    element={<ExampleSocketIOPage />}
                />
            </Route>

            <Route path="*" element={<>Not found</>} />
        </Route>
    )
);
