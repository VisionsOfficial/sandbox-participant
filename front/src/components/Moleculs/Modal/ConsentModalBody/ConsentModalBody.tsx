import React, { useState } from "react";
import Styles from "./ConsentModalBody.module.scss";
import { useConsentContext } from "../../../../hooks/useConsentContext";
import { Loader } from "../../../Atoms/Loaders/Loader/Loader";
import { Alert } from "../../../Atoms/Alert/Alert";
import { ConsentModalFooter } from "../ConsentModalFooter/ConsentModalFooter";
import { ExchangeSVG } from "../../../Atoms/SVGs/ExchangeSVG/ExchangeSVG";
import { CardCollapseSoftwareResource } from "../../Cards/CardCollapseSoftwareResource/CardCollapseSoftwareResource";
import { InputCheckbox } from "../../../Atoms/Inputs/InputCheckbox/InputCheckbox";
import { CardCollapse } from "../../../Atoms/Cards/CardCollapse/CardCollapse";
import { CardCollapseDataResource } from "../../Cards/CardCollapseDataResource/CardCollapseDataResource";
import { Flex } from "../../../Atoms/Flex/Flex";

const legalData = [
    {
        mainTitle: "Consent",
        information: [
            {
                title: "What is consent?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
                link: "#",
            },
            {
                title: "How to exercise the right to withdraw consent?",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
                link: "#",
            },
        ],
    },
    {
        mainTitle: "Methods of Data Processing and Collection",
        information: [
            {
                title: "",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
                link: "#",
            },
        ],
    },
    {
        mainTitle: "Data Localization",
        information: [
            {
                title: "",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
                link: "#",
            },
        ],
    },
    {
        mainTitle: "Data storage",
        information: [
            {
                title: "Duration",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
                link: "#",
            },
            {
                title: "Geolocation",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
                link: "#",
            },
        ],
    },
    {
        mainTitle: "Third-party services",
        information: [
            {
                title: "Organisation name",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
                link: "#",
            },
        ],
    },
];

export const ConsentModalBody = () => {
    const {
        modalContent,
        availableExchangesPopulate,
        apiStates,
        privacyNotices,
        privacyNotice,
        branding,
        selectedDataResource,
        updateUserInformation,
        updateSelectedDataResource,
        enableDataToggle,
    } = useConsentContext();

    const [exchangeSelected, setExchangeSelected] = useState<string>("");
    const [privacyNoticeSelected, setPrivacyNoticeSelected] =
        useState<string>("");

    const handleExchangeSelected = (value: string) => {
        setExchangeSelected(value);
    };

    const handlePrivacyNoticeSelected = (value: string) => {
        setPrivacyNoticeSelected(value);
    };

    const resourceIsSelected = (resource: string) => {
        const findIndex = selectedDataResource.findIndex(
            (el) => el === resource
        );
        return findIndex !== -1;
    };

    const renderBody = () => {
        if (apiStates.loading) {
            return (
                <Flex justify="center" align="center">
                    <Loader />
                </Flex>
            );
        }

        if (apiStates.error) {
            return <Alert type="error">Failed to fetch your data</Alert>;
        }

        const defaultBody = (
            <>
                <div className={Styles.participantContainer}>
                    <div className={Styles.participant}>
                        <img
                            src={
                                privacyNotice?.dataProvider?.logo?.includes(
                                    "https"
                                )
                                    ? privacyNotice?.dataProvider?.logo
                                    : `https://api.visionstrust.com/images/${privacyNotice?.dataProvider?.logo}`
                            }
                            alt={`Logo ${privacyNotice?.dataProvider?.legalName}`}
                            className={Styles.participantLogo}
                        />
                        <div className={Styles.controllerIdentify}>
                            <span>
                                {privacyNotice?.dataProvider?.legalName}
                            </span>
                            <span>Controller's identify</span>
                        </div>
                    </div>
                    <ExchangeSVG
                        fill={branding?.colors?.primary}
                        className={Styles.exchangeSVG}
                    />
                    {privacyNotice?.recipients?.map((r, i) => (
                        <div className={Styles.participant} key={r?._id + i}>
                            <img
                                src={
                                    r?.logo?.includes("https")
                                        ? r?.logo
                                        : `https://api.visionstrust.com/images/${r?.logo}`
                                }
                                alt={`Logo ${r?.legalName}`}
                                className={Styles.participantLogo}
                            />
                            <div className={Styles.controllerIdentify}>
                                <span>{r?.legalName}</span>
                                <span>Controller's identify</span>
                            </div>
                        </div>
                    ))}
                </div>
                {privacyNotice?.data && privacyNotice?.data?.length > 0 && (
                    <div className={Styles.sharingContainer}>
                        <h4>Select the data to share</h4>
                        <div className={Styles.dataContainer}>
                            <p className={Styles.obligation}>Requested</p>
                            {privacyNotice?.data?.map((d, index) => (
                                <React.Fragment key={d?._id + index}>
                                    <div
                                        className={
                                            resourceIsSelected(d?.resource)
                                                ? Styles.selected
                                                : Styles.information
                                        }
                                        onClick={() =>
                                            enableDataToggle
                                                ? updateSelectedDataResource(
                                                      d?.resource
                                                  )
                                                : null
                                        }
                                    >
                                        <h5>{d?.name}</h5>
                                        <span>{d?.description}</span>
                                        {d?.b2cDescription && (
                                            <span>{d?.b2cDescription}</span>
                                        )}
                                    </div>
                                    {d?.softwareResources?.length > 0 && (
                                        <div className={Styles.dataResources}>
                                            {d?.softwareResources?.map(
                                                (sr, i: number) => (
                                                    <div
                                                        className={
                                                            Styles.resourceItem
                                                        }
                                                        key={sr?._id + i}
                                                    >
                                                        <span
                                                            className={
                                                                Styles.resourceItemName
                                                            }
                                                        >
                                                            {sr?.name}
                                                        </span>
                                                        <span>
                                                            {sr?.description}
                                                        </span>
                                                        {sr?.b2cDescription && (
                                                            <span>
                                                                {
                                                                    sr?.b2cDescription
                                                                }
                                                            </span>
                                                        )}
                                                        <CardCollapseSoftwareResource
                                                            softwareResource={
                                                                sr
                                                            }
                                                            details
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                    {d?.dataResources?.length > 0 && (
                                        <div className={Styles.dataResources}>
                                            {d?.dataResources?.map(
                                                (dr, i: number) => (
                                                    <div
                                                        className={
                                                            Styles.resourceItem
                                                        }
                                                        key={dr?._id + i}
                                                    >
                                                        <span
                                                            className={
                                                                Styles.resourceItemName
                                                            }
                                                        >
                                                            {dr?.name}
                                                        </span>
                                                        <span>
                                                            {dr?.description}
                                                        </span>
                                                        {dr?.b2cDescription && (
                                                            <span>
                                                                {
                                                                    dr?.b2cDescription
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                <div className={Styles.emailContainer}>
                    <h4>
                        Are your using another email for your account on{" "}
                        {privacyNotice?.dataProvider?.legalName}
                    </h4>
                    <p>
                        Please specify if there is another email associated with
                        your account on {privacyNotice?.dataProvider?.legalName}
                        . Otherwise, indicate that you do not have one.
                    </p>
                    <div className={Styles.emailInputContainer}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email-custom"
                            id="email-custom"
                            className={Styles.emailCustom}
                            onChange={(e) =>
                                updateUserInformation(
                                    "email",
                                    e.currentTarget.value
                                )
                            }
                        />
                        <InputCheckbox
                            name="checkbox-trigger"
                            onChange={(e) =>
                                updateUserInformation(
                                    "trigger",
                                    e.currentTarget.checked
                                )
                            }
                        >
                            I do not have an account on{" "}
                            {privacyNotice?.dataProvider?.legalName}
                        </InputCheckbox>
                    </div>
                </div>
            </>
        );
        const learnMoreBody = (
            <div className={Styles.learnMoreContainer}>
                <div className={Styles.organisation}>
                    <div>
                        <h4>Orgnisation involved</h4>
                        <div className={Styles.organisationContent}>
                            {privacyNotice?.recipients?.map((r, i) => (
                                <CardCollapse
                                    key={r?._id + i}
                                    title={r?.legalName}
                                    description="Why is your data used ?"
                                    classNames={{
                                        main: Styles.card,
                                        avatar: Styles.participantLogo,
                                        headerWrapper: Styles.cardHeader,
                                        active: {
                                            headerWrapper: Styles.activeHeader,
                                        },
                                    }}
                                    avatar={
                                        r?.logo?.includes("https")
                                            ? {
                                                  src: r?.logo,
                                                  alt: `Logo ${r?.legalName}`,
                                              }
                                            : {
                                                  src: `https://api.visionstrust.com/images/${r?.logo}`,
                                                  alt: `Logo ${r?.legalName}`,
                                              }
                                    }
                                >
                                    {privacyNotice?.purposes?.map(
                                        (p, index) => (
                                            <div key={p?._id + index}>
                                                <p>
                                                    <b>{p?.name}</b>
                                                </p>
                                                <p>{p?.description}</p>
                                                {p?.location && (
                                                    <p>
                                                        <b>
                                                            You can find this
                                                            data here:
                                                        </b>{" "}
                                                        {p?.location}
                                                    </p>
                                                )}
                                                <div style={{ marginBlock: 8 }}>
                                                    {p?.softwareResources?.map(
                                                        (sr) => (
                                                            <CardCollapseSoftwareResource
                                                                softwareResource={
                                                                    sr
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </CardCollapse>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={Styles.sharing}>
                    <div>
                        <h4>Data sharing</h4>
                        <p>Your data</p>
                    </div>
                    <div className={Styles.sharingContent}>
                        <div className={Styles.yourDataSharing}>
                            {privacyNotice?.data?.map((d, index) => (
                                <CardCollapse
                                    key={d?._id + index}
                                    title={d?.name}
                                    classNames={{
                                        active: {
                                            headerWrapper: Styles.activeHeader,
                                        },
                                    }}
                                >
                                    <p>{d?.description}</p>
                                    {d?.location && (
                                        <p>
                                            <b>You can find this data here:</b>{" "}
                                            {d?.location}
                                        </p>
                                    )}
                                    {d?.softwareResources?.map((sr, i) => (
                                        <CardCollapseSoftwareResource
                                            key={sr?._id + i}
                                            softwareResource={sr}
                                        />
                                    ))}
                                    {d?.dataResources?.map((dr, i) => (
                                        <CardCollapseDataResource
                                            key={dr?._id + i}
                                            dataResource={dr}
                                        />
                                    ))}
                                </CardCollapse>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={Styles.pdiContainer}>
                    <h5>VISIONSTRUST</h5>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation
                    </p>
                </div>
            </div>
        );
        const legalBody = (
            <div className={Styles.legalContainer}>
                {legalData.map((ld, index) => (
                    <div key={ld.mainTitle + index}>
                        <h4 className={Styles.mainTitle}>{ld.mainTitle}</h4>
                        <div className={Styles.legalInformation}>
                            {ld.information.map((info, i) => (
                                <React.Fragment key={info.title + i}>
                                    {info.title && (
                                        <h5 className={Styles.informationTitle}>
                                            {info.title}
                                        </h5>
                                    )}
                                    <p
                                        className={
                                            Styles.informationDescription
                                        }
                                    >
                                        {info.description}{" "}
                                        {info.link && (
                                            <a
                                                href={info.link}
                                                target="_blank"
                                                className={
                                                    Styles.informationLink
                                                }
                                            >
                                                See more
                                            </a>
                                        )}
                                    </p>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
        const exchangeBody = (
            <>
                <div className={Styles.exchangesContainer}>
                    {availableExchangesPopulate &&
                        availableExchangesPopulate?.filter(
                            (el) => el?.contracts?.dataProvider?.legalName
                        )?.length > 0 && (
                            <div className={Styles.containerItems}>
                                <h4>Bi lateral contracts</h4>
                                {availableExchangesPopulate?.map(
                                    (exchange, i: number) => {
                                        const dataProviderName =
                                            exchange?.contracts?.dataProvider
                                                ?.legalName;
                                        const dataConsumerName =
                                            exchange?.consumer?.legalName;

                                        if (dataProviderName) {
                                            return (
                                                <div
                                                    className={`${
                                                        Styles.exchangeItem
                                                    } ${
                                                        exchangeSelected ===
                                                        exchange?.contracts?._id
                                                            ? Styles.active
                                                            : ""
                                                    }`}
                                                    key={i}
                                                    onClick={() =>
                                                        handleExchangeSelected(
                                                            exchange?.contracts
                                                                ?._id
                                                        )
                                                    }
                                                >
                                                    <p>
                                                        <b>
                                                            {dataProviderName}
                                                        </b>
                                                    </p>
                                                    <div>
                                                        {dataConsumerName}
                                                    </div>
                                                </div>
                                            );
                                        } else return null;
                                    }
                                )}
                            </div>
                        )}
                    {availableExchangesPopulate &&
                        availableExchangesPopulate?.filter(
                            (el) => el?.contracts?.ecosystem?.name
                        )?.length > 0 && (
                            <div className={Styles.containerItems}>
                                <h4>Data space use case contracts</h4>
                                {availableExchangesPopulate?.map(
                                    (exchange, i: number) => {
                                        const dataConsumerName =
                                            exchange?.consumer?.legalName;
                                        const ecosystemName =
                                            exchange?.contracts?.ecosystem
                                                ?.name;

                                        if (!ecosystemName) return null;
                                        return (
                                            <div
                                                className={`${
                                                    Styles.exchangeItem
                                                } ${
                                                    exchangeSelected ===
                                                    exchange?.contracts?._id
                                                        ? Styles.active
                                                        : ""
                                                }`}
                                                key={i}
                                                onClick={() =>
                                                    handleExchangeSelected(
                                                        exchange?.contracts?._id
                                                    )
                                                }
                                            >
                                                <div>
                                                    <p>
                                                        <b>{ecosystemName}</b>
                                                    </p>
                                                    <p>
                                                        {
                                                            exchange?.contracts
                                                                ?.ecosystem
                                                                ?.description
                                                        }
                                                    </p>
                                                </div>
                                                <div>{dataConsumerName}</div>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        )}

                    <ConsentModalFooter exchangeSelected={exchangeSelected} />
                </div>
            </>
        );
        const privacyNoticeBody = (
            <div className={Styles.privacyNoticeContainer}>
                {privacyNotices?.map((pn, index) => (
                    <div
                        className={`${Styles.item} ${
                            pn?._id === privacyNoticeSelected
                                ? Styles.active
                                : ""
                        }`}
                        key={pn?._id + index}
                        onClick={() => handlePrivacyNoticeSelected(pn?._id)}
                    >
                        <div>
                            {pn?.recipients?.map((r, i) => (
                                <p key={r?._id + i}>{r?.legalName}</p>
                            ))}
                        </div>
                        {pn?.purposes?.map((p, i) => (
                            <div key={p?.name + i}>
                                <h5>{p?.name}</h5>
                                <span>{p?.description}</span>
                            </div>
                        ))}
                    </div>
                ))}

                <ConsentModalFooter
                    privacyNoticeSelected={privacyNoticeSelected}
                />
            </div>
        );
        const successBody = (
            <div className={Styles.body}>
                <div></div>
            </div>
        );

        const currentBody = {
            sharing: defaultBody,
            learnMore: learnMoreBody,
            legal: legalBody,
            chooseExchange: exchangeBody,
            choosePrivacyNotice: privacyNoticeBody,
            success: successBody,
        };

        return currentBody[modalContent];
    };

    return <div className={Styles.ConsentModalBody}>{renderBody()}</div>;
};
