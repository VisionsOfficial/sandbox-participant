import { useState } from "react";
import "./App.css";
import { ConsentModal } from "../src/components/ConsentModal/ConsentModal.tsx";
import { RegistrationForm } from "../src/components/Organismes/Forms/RegistrationForm/RegistrationForm.tsx";
import { FormType } from "../src/types";
import { Button } from "../src/components/Atoms/Button/Button.tsx";

function App() {
    const [visible, setVisible] = useState(false);
    const [userIdentifier, setUserIdentifier] = useState<string>(
        "65646d4320ec42ff2e719706"
    );
    const [currentForm, setCurrentForm] = useState<FormType>("login");

    const handleFormChange = (type: FormType) => {
        setCurrentForm(type);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <div>
                {userIdentifier && (
                    <Button onClick={() => setVisible(true)}>Open modal</Button>
                )}
                <ConsentModal
                    visible={visible}
                    onCancel={handleCancel}
                    PDCAdminJWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlS2V5IjoiQTVkdzY5OHNuWGlKUlZmYjZjTTR1RDd3M2JDTWdhbllKZ2VIWmZERGNIcE41QnlESmJOUE1XQm50TktCYVhqTlJ6dVd6NzRRUDlHVU5ZWEdxR2plVWJNMzY3YUhaTnNaRlNKNCIsImlhdCI6MTcxMzI1NTIwNzA0NSwiZXhwIjoxNzEzMjU1MjA3MzQ1fQ.ZhnBBzCQU9HF8dTY12eNp4AcYHFCpoK298oNJJqRVXo"
                    sessionCheckEndpoint="https://provider-data-connector-253244a6c16c.herokuapp.com/private/consent?triggerDataExchange=true"
                    userIdentifier={userIdentifier}
                    enableToggle={true}
                    // privacyNoticeEndpoint="https://provider-data-connector-253244a6c16c.herokuapp.com/private/consent/65646d4320ec42ff2e719706/privacy-notice/65e9f407de244c2a18764332"
                />

                {!userIdentifier && (
                    <RegistrationForm
                        formType={currentForm}
                        onFormChange={handleFormChange}
                    />
                )}
                <RegistrationForm
                    formType={currentForm}
                    onFormChange={handleFormChange}
                />
            </div>
        </>
    );
}

export default App;
