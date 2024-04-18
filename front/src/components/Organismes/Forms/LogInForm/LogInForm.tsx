import React, { FormEvent, useState } from "react";
import { Button } from "../../../Atoms/Button/Button";
import { Input } from "../../../Atoms/Inputs/Input/Input";
import Styles from "./LogInForm.module.scss";
import { APP_REGEX } from "../../../../constants/regex";
import { Separator } from "../../../Atoms/Separator/Separator";
import { UserSVG } from "../../../Atoms/SVGs/UserSVG/UserSVG";
import { EmailSVG } from "../../../Atoms/SVGs/EmailSVG/EmailSVG";
import { PasswordSVG } from "../../../Atoms/SVGs/PasswordSVG/PasswordSVG";

const FORM_FIELDS: {
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

type LogInFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export const LogInForm = () => {
    const [formState, setFormState] = useState<LogInFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [apiState, setApiState] = useState<{
        loading: boolean;
        error: boolean;
    }>({ loading: false, error: false });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiState({ loading: true, error: false });

        let error = 0;

        if (
            !formState.firstName ||
            !formState.lastName ||
            !formState.password ||
            !formState.email
        )
            return error++;

        if (
            !APP_REGEX.name.test(formState.firstName) ||
            !APP_REGEX.name.test(formState.lastName) ||
            !APP_REGEX.email.test(formState.email)
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

    const handleChangeFormFields = (fieldName: string, value: string) => {
        setFormState((prev) => ({ ...prev, [fieldName]: value }));
    };

    return (
        <form className={Styles.LogInForm} onSubmit={handleSubmit}>
            {FORM_FIELDS.map((ff, i) => (
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
                <span className={Styles.formChange}>Sign Up</span>
            </p>
        </form>
    );
};
