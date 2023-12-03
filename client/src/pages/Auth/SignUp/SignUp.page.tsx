import Styles from "./SignUpPage.module.scss";

import { RegisterForm } from "../../../components/molecules/Forms/RegisterForm/RegisterForm";
import { TRANSLATION_KEYS } from "../../../constants/translationKeys";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/atoms/Buttons/Button/Button";
import { Link } from "react-router-dom";
import { APP_LINK } from "../../../constants/appLinks";
import { GoogleSignInButton } from "../../../components/atoms/Buttons/GoogleSignInButton/GoogleSignInButton";
import { Col } from "../../../components/molecules/Containers/Col/Col";

export const SignUpPage = () => {
    const { t } = useTranslation();

    return (
        <div className={Styles.SignUpPage}>
            <h1>{t(TRANSLATION_KEYS.pageSignupTitle)}</h1>
            <div className={Styles.form}>
                <RegisterForm />
                <br />
                <hr />
                <Col>
                    <p>{t(TRANSLATION_KEYS.pageSignupHasaccount)}</p>
                    <Button style={{ minWidth: 180 }} variant="primary">
                        <Link to={APP_LINK.public.login}>
                            {t(TRANSLATION_KEYS.buttonLogin)}
                        </Link>
                    </Button>
                    <br />
                    <GoogleSignInButton />
                </Col>
            </div>
        </div>
    );
};
