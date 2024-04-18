import React, { FormEvent, PropsWithChildren, useState } from "react";
import Styles from "./RegistrationForm.module.scss";
import { APP_REGEX } from "../../../../constants/regex";
import { EmailSVG } from "../../../Atoms/SVGs/EmailSVG/EmailSVG";
import { PasswordSVG } from "../../../Atoms/SVGs/PasswordSVG/PasswordSVG";
import { UserSVG } from "../../../Atoms/SVGs/UserSVG/UserSVG";
import { Button } from "../../../Atoms/Button/Button";
import { Input } from "../../../Atoms/Inputs/Input/Input";
import { Separator } from "../../../Atoms/Separator/Separator";
import { FormType } from "../../../../types";

type RegistrationFormProps = {
    formType: FormType;
    onFormChange: (type: FormType) => void;
};

const FORM_FIELDS_LOGIN: {
    label: string;
    type: string;
    name: string;
    required: boolean;
    pattern?: RegExp;
    icon?: React.JSX.Element;
}[] = [
    {
        label: "First Name",
        type: "text",
        name: "firstName",
        required: true,
        pattern: APP_REGEX.name,
        icon: <UserSVG />,
    },
    {
        label: "Last Name",
        type: "text",
        name: "lastName",
        required: true,
        pattern: APP_REGEX.name,
        icon: <UserSVG />,
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        required: true,
        pattern: APP_REGEX.email,
        icon: <EmailSVG />,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        required: true,
        icon: <PasswordSVG />,
    },
];

const FORM_FIELDS_SIGNUP: {
    label: string;
    type: string;
    name: string;
    required: boolean;
    pattern?: RegExp;
    icon?: React.JSX.Element;
}[] = [
    {
        label: "First Name",
        type: "text",
        name: "firstName",
        required: true,
        pattern: APP_REGEX.name,
        icon: <UserSVG />,
    },
    {
        label: "Last Name",
        type: "text",
        name: "lastName",
        required: true,
        pattern: APP_REGEX.name,
        icon: <UserSVG />,
    },
    {
        label: "Email",
        type: "email",
        name: "email",
        required: true,
        pattern: APP_REGEX.email,
        icon: <EmailSVG />,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        required: true,
        icon: <PasswordSVG />,
    },
    {
        label: "Confirm Password",
        type: "password",
        name: "confirmPassword",
        required: true,
        icon: <PasswordSVG />,
    },
];

type LogInFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type SignUpFormData = LogInFormData & {
    confirmPassword: string;
};

export const RegistrationForm = ({
    formType = "login",
    onFormChange,
}: PropsWithChildren<RegistrationFormProps>) => {
    const [formLoginState, setFormLoginState] = useState<LogInFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [formSignupState, setFormSignupState] = useState<SignUpFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [apiState, setApiState] = useState<{
        loading: boolean;
        error: boolean;
    }>({ loading: false, error: false });

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiState({ loading: true, error: false });

        let error = 0;

        if (
            !formLoginState.firstName ||
            !formLoginState.lastName ||
            !formLoginState.password ||
            !formLoginState.email
        )
            return error++;

        if (
            !APP_REGEX.name.test(formLoginState.firstName) ||
            !APP_REGEX.name.test(formLoginState.lastName) ||
            !APP_REGEX.email.test(formLoginState.email)
        )
            error++;

        if (error > 0) return;

        try {
            console.log("fetch");
        } catch (error) {
            setApiState({ loading: false, error: true });
            console.error(error);
            throw new Error("Failed to fetch the current user.");
        } finally {
            setApiState({ loading: false, error: false });
        }
    };

    const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiState({ loading: true, error: false });

        let error = 0;

        if (
            !formSignupState.firstName ||
            !formSignupState.lastName ||
            !formSignupState.password ||
            !formSignupState.email
        )
            return error++;

        if (
            !APP_REGEX.name.test(formSignupState.firstName) ||
            !APP_REGEX.name.test(formSignupState.lastName) ||
            !APP_REGEX.email.test(formSignupState.email) ||
            !APP_REGEX.password.test(formSignupState.password)
        )
            error++;

        if (formSignupState.confirmPassword !== formSignupState.password) {
            error++;
        }

        if (error > 0) {
            return;
        }

        console.log("submit");
    };

    const handleChangeFormFields = (fieldName: string, value: string) => {
        formType === "login"
            ? setFormLoginState((prev) => ({ ...prev, [fieldName]: value }))
            : setFormSignupState((prev) => ({ ...prev, [fieldName]: value }));
    };

    const displayFooterForm = () => {
        const current = {
            login: (
                <>
                    <Button
                        variant="primary"
                        className={Styles.btnSubmit}
                        loading={apiState.loading}
                        disabled={apiState.loading}
                    >
                        Log in
                    </Button>

                    <p className={Styles.account}>
                        Don't have account ?{" "}
                        <span
                            className={Styles.formChange}
                            onClick={() => {
                                onFormChange("signup");
                            }}
                        >
                            Sign Up
                        </span>
                    </p>
                </>
            ),
            signup: (
                <>
                    <Button
                        variant="primary"
                        className={Styles.btnSubmit}
                        loading={apiState.loading}
                        disabled={apiState.loading}
                    >
                        Sign Up
                    </Button>
                    <p className={Styles.account}>
                        You have account ?{" "}
                        <span
                            className={Styles.formChange}
                            onClick={() => {
                                onFormChange("login");
                            }}
                        >
                            Log In
                        </span>
                    </p>
                </>
            ),
        };

        return current[formType];
    };

    return (
        <form
            className={Styles.RegistrationForm}
            onSubmit={
                formType === "login" ? handleLoginSubmit : handleSignupSubmit
            }
        >
            {formType === "login"
                ? FORM_FIELDS_LOGIN.map((ff, i) => (
                      <div key={ff.name + i} className={Styles.formItem}>
                          <label className={Styles.formItemLabel}>
                              {ff.icon} {ff.label}
                          </label>
                          <Input
                              name={ff.name}
                              type={ff.type}
                              onChange={(e) =>
                                  handleChangeFormFields(
                                      ff.name,
                                      e.currentTarget.value
                                  )
                              }
                              required={ff.required}
                              rules={{ pattern: ff.pattern }}
                              className={Styles.formItemInput}
                          />
                      </div>
                  ))
                : FORM_FIELDS_SIGNUP.map((ff, i) => (
                      <div key={ff.name + i} className={Styles.formItem}>
                          <label className={Styles.formItemLabel}>
                              {ff.icon} {ff.label}
                          </label>
                          <Input
                              name={ff.name}
                              type={ff.type}
                              onChange={(e) =>
                                  handleChangeFormFields(
                                      ff.name,
                                      e.currentTarget.value
                                  )
                              }
                              required={ff.required}
                              rules={{ pattern: ff.pattern }}
                              className={Styles.formItemInput}
                          />
                      </div>
                  ))}

            <Separator className={Styles.separator} />

            {displayFooterForm()}
        </form>
    );
};
