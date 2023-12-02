import { useOutlet } from "react-router-dom";
import { AuthProvider } from "../auth/AuthProvider";
import { FooterNav } from "../components/molecules/Nav/FooterNav/FooterNav";
import { BreakpointProvider } from "../contexts/BreakpointProvider";
import { NavBar } from "../components/organisms/NavBar/NavBar";
import { OptionsBar } from "../components/organisms/OptionsBar/OptionsBar";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthProvider>
            <BreakpointProvider>
                <main>
                    <NavBar />
                    <OptionsBar />
                    {outlet}
                    <FooterNav />
                </main>
            </BreakpointProvider>
        </AuthProvider>
    );
};
