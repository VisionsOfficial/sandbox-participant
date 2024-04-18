import { useConsentContext } from "../../../../hooks/useConsentContext";
import { Button } from "../../../Atoms/Button/Button";
import Styles from "./ConsentModalFooter.module.scss";
import logoVT from "../../../../assets/logoVT.png";

type ConsentModalFooterProps = {
    exchangeSelected?: string;
    privacyNoticeSelected?: string;
    hide?: boolean;
};

export const ConsentModalFooter = ({
    exchangeSelected = "",
    privacyNoticeSelected = "",
    hide = false,
}: ConsentModalFooterProps) => {
    const {
        modalContent,
        updateAvailableExchangeSelected,
        updatePrivacyNoticeSelected,
        onCancel,
        onConsent,
        apiStates,
    } = useConsentContext();

    if (hide) return null;

    const renderFooter = () => {
        const defaultFooter = (
            <>
                <div className={Styles.buttons}>
                    <Button
                        variant="primary"
                        shape="round"
                        classNames={{ button: Styles.agree }}
                        onClick={onConsent}
                    >
                        Agree
                    </Button>
                    <Button
                        variant="outline"
                        shape="round"
                        classNames={{ button: Styles.decline }}
                        onClick={onCancel}
                    >
                        Decline
                    </Button>
                </div>
                <div className={Styles.certified}>
                    Certified consents by{" "}
                    <img
                        src={logoVT}
                        alt="Logo VisionTrust"
                        className={Styles.certifiedLogo}
                    />
                    <b>Visionstrust</b>
                </div>
            </>
        );

        const exchangeFooter = (
            <Button
                onClick={() =>
                    updateAvailableExchangeSelected(exchangeSelected)
                }
                variant="primary"
                disabled={exchangeSelected === ""}
                loading={apiStates.loading}
            >
                Confirm exchange
            </Button>
        );

        const privacyNoticeFooter = (
            <Button
                onClick={() =>
                    updatePrivacyNoticeSelected(privacyNoticeSelected)
                }
                variant="primary"
                disabled={privacyNoticeSelected === ""}
                loading={apiStates.loading}
            >
                Confirm Privacy notice
            </Button>
        );

        const successFooter = <></>;

        const currentFooter = {
            sharing: defaultFooter,
            learnMore: defaultFooter,
            legal: defaultFooter,
            chooseExchange: exchangeFooter,
            choosePrivacyNotice: privacyNoticeFooter,
            success: successFooter,
        };

        return currentFooter[modalContent];
    };

    return <div className={Styles.ConsentModalFooter}>{renderFooter()}</div>;
};
