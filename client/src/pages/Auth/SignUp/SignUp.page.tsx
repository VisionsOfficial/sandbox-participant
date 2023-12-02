import Styles from "./SignUpPage.module.scss";

import { RegisterForm } from "../../../components/molecules/Forms/RegisterForm/RegisterForm";

export const SignUpPage = () => {
    return (
        <div className={Styles.SignUpPage}>
            <h2>Signup</h2>
            <RegisterForm />
        </div>
    );
};
