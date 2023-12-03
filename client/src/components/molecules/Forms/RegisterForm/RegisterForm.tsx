import { PropsWithChildren, useReducer, useState } from "react";
import Styles from "./RegisterForm.module.scss";
import { Form } from "../../../atoms/Forms/Form/Form";
import { FormPropsType } from "../../../../types/genericComponentProps";
import { FormInput } from "../../../atoms/Inputs/FormInput/FormInput";
import { useTranslation } from "react-i18next";
import { Credentials } from "../../../../auth/auth.api";
import { Button } from "../../../atoms/Buttons/Button/Button";
import { useAuth } from "../../../../auth/AuthProvider";
import { TRANSLATION_KEYS } from "../../../../constants/translationKeys";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCross, faX } from "@fortawesome/free-solid-svg-icons";
import { AxiosError } from "axios";
import { Alert } from "../../../atoms/Alerts/Alert/Alert";

type RegisterFormProps = FormPropsType & {
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

export const RegisterForm = (props: PropsWithChildren<RegisterFormProps>) => {
    const { children, defaultEmail, ...rest } = props;
    const { t } = useTranslation();

    const [formData, dispatch] = useReducer(reducer, {
        ...initialState,
        email: defaultEmail ?? initialState.email,
    });

    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const { register, mutationRegister } = useAuth();

    const passwordMatch = !!(
        formData.password &&
        passwordConfirmation &&
        passwordConfirmation === formData.password
    );

    const handleSubmit = () => {
        if (!passwordMatch) return;

        register(formData);
    };

    console.log(mutationRegister);

    return (
        <Form className={Styles.RegisterForm} {...rest}>
            <FormInput
                type="email"
                id="email"
                name="email"
                label={t(TRANSLATION_KEYS.formLabelEmail)}
                value={formData.email}
                required
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
                required
                onChange={(e) =>
                    dispatch({
                        type: "SET_PASSWORD",
                        payload: e.target.value,
                    })
                }
            />
            <FormInput
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                label={t(TRANSLATION_KEYS.formLabelPasswordconfirmation)}
                value={passwordConfirmation}
                required
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {formData.password && passwordConfirmation && (
                <div>
                    <FontAwesomeIcon icon={passwordMatch ? faCheck : faX} />
                    <small>
                        {passwordMatch
                            ? t(TRANSLATION_KEYS.pageSignupPasswordmatch)
                            : t(TRANSLATION_KEYS.pageSignupPasswordnomatch)}
                    </small>
                </div>
            )}
            {mutationRegister.error &&
                mutationRegister.error instanceof AxiosError && (
                    <>
                        {mutationRegister.error?.response?.status === 400 && (
                            <Alert type={"error"}>
                                {t(TRANSLATION_KEYS.pageSignupInvalidpassword)}
                            </Alert>
                        )}
                        {mutationRegister.error?.response?.status === 409 && (
                            <Alert type={"error"}>
                                {t(TRANSLATION_KEYS.pageSignupExistingemail)}
                            </Alert>
                        )}
                    </>
                )}
            <br />
            <Button
                type="submit"
                variant="accent"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                disabled={!passwordMatch && !!formData.email}
            >
                {t(TRANSLATION_KEYS.buttonRegister)}
            </Button>
            {children}
        </Form>
    );
};
