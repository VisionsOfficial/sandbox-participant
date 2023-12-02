import { useTranslation } from "react-i18next";
import { LoginForm } from "../../../components/molecules/Forms/LoginForm/LoginForm";
import Styles from "./SignInPage.module.scss";
import { TRANSLATION_KEYS } from "../../../constants/translationKeys";
import { Link } from "react-router-dom";
import { APP_LINK } from "../../../constants/appLinks";
import { Button } from "../../../components/atoms/Buttons/Button/Button";

export const SignInPage = () => {
    const { t } = useTranslation();

    return (
        <div className={Styles.SignInPage}>
            <h1>{t(TRANSLATION_KEYS.pageSigninTitle)}</h1>
            <div className={Styles.form}>
                <LoginForm />
                <br />
                <p>{t(TRANSLATION_KEYS.pageSigninNoaccount)}</p>
                <Button variant="primary">
                    <Link to={APP_LINK.public.register}>
                        {t(TRANSLATION_KEYS.buttonRegister)}
                    </Link>
                </Button>
            </div>
        </div>
    );
};
