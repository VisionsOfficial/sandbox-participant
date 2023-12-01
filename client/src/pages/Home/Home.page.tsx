import Styles from "./HomePage.module.scss";
import { Button } from "../../components/atoms/Buttons/Button/Button";
import { useAuth } from "../../contexts/AuthProvider";

export const HomePage = () => {
    const { login } = useAuth();

    return (
        <div className={Styles.HomePage}>
            <h1>Home Page</h1>
            <Button
                onClick={async () => {
                    try {
                        await login("johndoe@example.com", "@Password123!");
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
