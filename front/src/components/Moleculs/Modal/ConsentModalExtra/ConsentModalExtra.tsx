import { useConsentContext } from "../../../../hooks/useConsentContext";
import { ModalContent } from "../../../../types";
import Styles from "./ConsentModalExtra.module.scss";

export const ConsentModalExtra = () => {
    const { modalContent, updateModalContent } = useConsentContext();

    const handleClick = (content: ModalContent) => {
        if (modalContent === content) return;
        updateModalContent(content);
    };

    if (
        modalContent === "sharing" ||
        modalContent === "learnMore" ||
        modalContent === "legal"
    ) {
        return (
            <div className={Styles.ConsentModalExtra}>
                <button
                    className={modalContent === "sharing" ? Styles.active : ""}
                    onClick={() => handleClick("sharing")}
                >
                    Share my data
                </button>
                <button
                    className={
                        modalContent === "learnMore" ? Styles.active : ""
                    }
                    onClick={() => handleClick("learnMore")}
                >
                    Learn more
                </button>
                <button
                    className={modalContent === "legal" ? Styles.active : ""}
                    onClick={() => handleClick("legal")}
                >
                    Legal
                </button>
            </div>
        );
    } else return null;
};
