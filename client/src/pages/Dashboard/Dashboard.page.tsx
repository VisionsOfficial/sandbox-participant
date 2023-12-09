import Styles from "./DashboardPage.module.scss";
import { Link } from "react-router-dom";
import { APP_LINK } from "../../constants/appLinks";
import { Button } from "../../components/atoms/Buttons/Button/Button";

export const DashboardPage = () => {
    return (
        <div className={Styles.DashboardPage}>
            <h1>Dashboard</h1>
            <Button>
                <Link to={APP_LINK.private.examples.todos}>Examples Todos</Link>
            </Button>
            <br />
            <br />
            <Button>
                <Link to={APP_LINK.private.examples.socketio}>
                    Example SocketIO
                </Link>
            </Button>
        </div>
    );
};
