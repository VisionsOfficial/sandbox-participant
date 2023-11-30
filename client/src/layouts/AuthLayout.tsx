import { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { Loader } from "../components/atoms/Loaders/Loader/Loader";
import { ErrorPage } from "../pages/Error/Error.page";
import { AuthProvider } from "../contexts/AuthProvider";
import { FooterNav } from "../components/molecules/Nav/FooterNav/FooterNav";
import { BreakpointProvider } from "../contexts/BreakpointProvider";

export const AuthLayout = () => {
    const outlet = useOutlet();

    const { userPromise } = useLoaderData() as {
        userPromise: Promise<null | object>;
    };

    return (
        <Suspense fallback={<Loader />}>
            <Await
                resolve={userPromise}
                errorElement={<ErrorPage />}
                children={(user) => (
                    <BreakpointProvider>
                        <main>
                            <AuthProvider userData={user}>
                                {outlet}
                                <FooterNav />
                            </AuthProvider>
                        </main>
                    </BreakpointProvider>
                )}
            />
        </Suspense>
    );
};
