import Styles from "./HomePage.module.scss";
import { Button } from "../../components/atoms/Buttons/Button/Button";
import { useAuth } from "../../contexts/AuthProvider";
import { login } from "../../api/auth.api";

export const HomePage = () => {
    const { login: sessionRefresh } = useAuth();

    return (
        <div className={Styles.HomePage}>
            <h1>Home Page</h1>
            <Button
                onClick={async () => {
                    try {
                        await login({
                            email: "johndoe@example.com",
                            password: "@Password123!",
                        });
                        sessionRefresh();
                    } catch (err) {
                        console.error(err);
                    }
                }}
            >
                Login
            </Button>
        </div>
    );
};
