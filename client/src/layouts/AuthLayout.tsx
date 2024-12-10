import { useOutlet } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import { FooterNav } from "../components/molecules/Nav/FooterNav/FooterNav";
import { BreakpointProvider } from "../contexts/BreakpointProvider";
import { NavBar } from "../components/organisms/NavBar/NavBar";
import { OptionsBar } from "../components/organisms/OptionsBar/OptionsBar";

type AuthLayoutProps = {
    errorElement?: JSX.Element;
};

export const AuthLayout = ({ errorElement }: AuthLayoutProps) => {
    const outlet = useOutlet();

    return (
        <AuthProvider>
            <BreakpointProvider>
                <main>
                    <NavBar />
                    <OptionsBar />
                    {!!errorElement ? errorElement : outlet}
                    <FooterNav />
                </main>
            </BreakpointProvider>
        </AuthProvider>
    );
};
