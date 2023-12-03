import Styles from "./ErrorPage.module.scss";

export const ErrorPage = () => {
    return (
        <div className={Styles.ErrorPage}>
            <h1>Error</h1>
            <h3>This page might not exist</h3>
        </div>
    );
};
