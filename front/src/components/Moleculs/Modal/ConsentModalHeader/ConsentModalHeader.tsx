import { useConsentContext } from "../../../../hooks/useConsentContext";
import Styles from "./ConsentModalHeader.module.scss";

export const ConsentModalHeader = () => {
    const { modalContent, privacyNotice } = useConsentContext();

    const renderHeader = () => {
        const defaultHeader = (
            <>
                <h3>Sharing your personal data for the purpose of</h3>
                <h3 className={Styles.purpose}>
                    {privacyNotice?.purposes?.[0]?.name}
                </h3>
            </>
        );
        const learnMoreHeader = (
            <h3 className={Styles.purpose}>
                Discover how your data will be used
            </h3>
        );
        const legalHeader = (
            <>
                <h3 className={Styles.purpose}>
                    Legal aspects of your consent
                </h3>
                <p>
                    Understanding your data rights empowers you to take control
                    of your personal information.
                </p>
            </>
        );
        const exchangeHeader = <h3>Select your exchange contract</h3>;
        const privacyNoticeHeader = <h3>Select your privacy notice</h3>;
        const successHeader = (
            <h3>Congrat you consent was successfuly create.</h3>
        );

        const currentHeader = {
            sharing: defaultHeader,
            learnMore: learnMoreHeader,
            legal: legalHeader,
            chooseExchange: exchangeHeader,
            choosePrivacyNotice: privacyNoticeHeader,
            success: successHeader,
        };

        return currentHeader[modalContent];
    };
    return <div className={Styles.ConsentModalHeader}>{renderHeader()}</div>;
};
