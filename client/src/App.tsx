import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { APIClientProvider } from "react-api-client-provider";
import { config } from "./config/environment.config";

export const App = () => {
    return (
        <APIClientProvider
            baseURL={config.apiURL}
            requestInterceptors={(opts) => ({
                ...opts,
                withCredentials: true,
            })}
            responseInterceptors={(res) => {
                console.log(res);
                return res;
            }}
            defaultHeaders={{ withCredentials: "true" }}
        >
            <RouterProvider router={router} />;
        </APIClientProvider>
    );
};
