import { PropsWithChildren, useReducer } from "react";
import Styles from "./LoginForm.module.scss";
import { Form } from "../../../atoms/Forms/Form/Form";
import { FormPropsType } from "../../../../types/genericComponentProps";
import { FormInput } from "../../../atoms/Inputs/FormInput/FormInput";
import { useTranslation } from "react-i18next";
import { Credentials } from "../../../../auth/auth.api";
import { Button } from "../../../atoms/Buttons/Button/Button";
import { useAuth } from "../../../../auth/AuthProvider";
import { TRANSLATION_KEYS } from "../../../../constants/translationKeys";
import { Alert } from "../../../atoms/Alerts/Alert/Alert";

type LoginFormProps = FormPropsType & {
    defaultEmail?: string;
};

const initialState = {
    email: "",
    password: "",
};

type FormAction =
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_PASSWORD"; payload: string };

const reducer = (state: Credentials, action: FormAction) => {
    switch (action.type) {
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        default:
            return state;
    }
};

export const LoginForm = (props: PropsWithChildren<LoginFormProps>) => {
    const { children, defaultEmail, ...rest } = props;
    const { t } = useTranslation();

    const [formData, dispatch] = useReducer(reducer, initialState);

    const { login, mutationLogin } = useAuth();

    return (
        <Form className={Styles.LoginForm} {...rest}>
            <FormInput
                type="email"
                id="email"
                name="email"
                label={t(TRANSLATION_KEYS.formLabelEmail)}
                value={formData.email}
                onChange={(e) =>
                    dispatch({
                        type: "SET_EMAIL",
                        payload: e.target.value,
                    })
                }
            />
            <FormInput
                type="password"
                id="password"
                name="password"
                label={t(TRANSLATION_KEYS.formLabelPassword)}
                value={formData.password}
                onChange={(e) =>
                    dispatch({
                        type: "SET_PASSWORD",
                        payload: e.target.value,
                    })
                }
            />

            {mutationLogin.error && (
                <Alert type="error">
                    {t(TRANSLATION_KEYS.pageSigninInvalidcredentials)}
                </Alert>
            )}

            <Button
                type="submit"
                onClick={async (e) => {
                    e.preventDefault();
                    login(formData);
                }}
                disabled={mutationLogin.isPending}
                variant="accent"
            >
                {t(TRANSLATION_KEYS.buttonLogin)}
            </Button>
            {children}
        </Form>
    );
};
