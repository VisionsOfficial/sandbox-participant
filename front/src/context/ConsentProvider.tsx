import React, {
    createContext,
    PropsWithChildren,
    useState,
    useEffect,
} from "react";
import {
    APIStates,
    AvailableExchanges,
    AvailableExchangesPopulate,
    ConsentContextType,
    ConsentModalBranding,
    Exchanges,
    ModalContent,
    PrivacyNotice,
    UserInformation,
} from "../types";
import { APP_REGEX } from "../../src/constants/regex.ts";

interface ConsentProviderProps {
    privacyNoticeEndpoint?: string;
    sessionCheckEndpoint: string;
    PDCAdminJWT: string;
    userIdentifier: string;
    branding?: ConsentModalBranding;
    visible: boolean;
    demo?: boolean;
    onCancel: () => void;
    enableToggle?: boolean;
}

// @ts-ignore
const initialContextData: ConsentContextType = {
    modalContent: "sharing",
    privacyNotice: {
        _id: "",
        data: [],
        recipients: [],
        dataProvider: {
            legalName: "",
            legalPerson: {
                headquatersAddress: {
                    countryCode: "",
                },
                legalAddress: {
                    countryCode: "",
                },
                parentOrganization: [],
                registrationNumber: "",
                subOrganization: [],
            },
            logo: "",
            dataspaceConnectorAppKey: "",
            dataspaceEndpoint: "",
            associatedOrganisation: "",
            termsAndConditions: "",
        },
        piiPrincipalRights: [],
        purposes: [],
    },
    branding: {},
};
export const ConsentContext =
    createContext<ConsentContextType>(initialContextData);

// @ts-ignore
const demoResponse = {
    timestamp: 1712935621739,
    code: 200,
    content: {
        _id: "66192646f51b1975026bc3ab",
        contract: {
            _id: "65e9b5281b787b8df8dc1e8a",
            ecosystem:
                "http://host.docker.internal:4040/v1/catalog/ecosystems/65e9b5286f9143089515016d",
            orchestrator:
                "http://host.docker.internal:4040/v1/catalog/participants/6580169c805dabd62b17560d",
            // @ts-ignore
            rolesAndObligations: [],
            status: "pending",
            serviceOfferings: [
                {
                    participant:
                        "http://host.docker.internal:4040/v1/catalog/participants/6564abb5d853e8e05b132057",
                    serviceOffering:
                        "http://host.docker.internal:4040/v1/catalog/serviceofferings/65e7384774f9e9026bd5ee7c",
                    policies: [
                        {
                            description:
                                "MUST not use data for more than n times",
                            permission: [
                                {
                                    action: "use",
                                    target: "http://host.docker.internal:4040/v1/catalog/serviceofferings/65e7384774f9e9026bd5ee7c",
                                    constraint: [
                                        {
                                            leftOperand: "count",
                                            operator: "lt",
                                            rightOperand: 10,
                                        },
                                    ],
                                },
                            ],
                            // @ts-ignore
                            prohibition: [],
                        },
                    ],
                    _id: "65eb2557a32767256e85f9f1",
                },
                {
                    participant:
                        "http://host.docker.internal:4040/v1/catalog/participants/6564aaebd853e8e05b1317c1",
                    serviceOffering:
                        "http://host.docker.internal:4040/v1/catalog/serviceofferings/65e7380074f9e9026bd5edc8",
                    policies: [
                        {
                            description:
                                "MUST not use data for more than n times",
                            permission: [
                                {
                                    action: "use",
                                    target: "http://host.docker.internal:4040/v1/catalog/serviceofferings/65e7380074f9e9026bd5edc8",
                                    constraint: [
                                        {
                                            leftOperand: "count",
                                            operator: "lt",
                                            rightOperand: 10,
                                        },
                                    ],
                                },
                            ],
                            prohibition: [],
                        },
                    ],
                    _id: "65eb255ea32767256e85f9fb",
                },
                {
                    participant: "6564abb5d853e8e05b132057",
                    serviceOffering: "65e7384774f9e9026bd5ee7c",
                    policies: [
                        {
                            description:
                                "MUST not use data for more than n times",
                            permission: [
                                {
                                    action: "use",
                                    target: "65e7384774f9e9026bd5ee7c",
                                    constraint: [
                                        {
                                            leftOperand: "count",
                                            operator: "lt",
                                            rightOperand: 55,
                                        },
                                    ],
                                },
                            ],
                            prohibition: [],
                        },
                    ],
                    _id: "65ef0987b6e24b4edb614f3f",
                },
            ],
            // @ts-ignore
            purpose: [],
            members: [
                {
                    participant:
                        "http://host.docker.internal:4040/v1/catalog/participants/6580169c805dabd62b17560d",
                    role: "orchestrator",
                    signature: "hasSigned",
                    date: "2024-03-07T12:38:05.820Z",
                },
                {
                    participant:
                        "http://host.docker.internal:4040/v1/catalog/participants/6564abb5d853e8e05b132057",
                    role: "participant",
                    signature: "hasSigned",
                    date: "2024-03-08T14:48:55.116Z",
                },
                {
                    participant:
                        "http://host.docker.internal:4040/v1/catalog/participants/6564aaebd853e8e05b1317c1",
                    role: "participant",
                    signature: "hasSigned",
                    date: "2024-03-08T14:49:02.272Z",
                },
            ],
            // @ts-ignore
            revokedMembers: [],
            createdAt: "2024-03-07T12:38:00.541Z",
            updatedAt: "2024-03-11T13:46:23.128Z",
            __v: 8,
        },
        lastUpdated: "1712924230755",
        dataProvider: {
            "@context": "http://host.docker.internal:4040/v1/participant",
            "@type": "Participant",
            _id: "6564abb5d853e8e05b132057",
            // @ts-ignore
            did: null,
            legalName: "participantTwo",
            legalPerson: {
                registrationNumber: "",
                headquartersAddress: {
                    countryCode: "",
                },
                legalAddress: {
                    countryCode: "",
                },
                // @ts-ignore
                parentOrganization: [],
                // @ts-ignore
                subOrganization: [],
            },
            termsAndConditions: "",
            associatedOrganisation: "6564abb5d853e8e05b132056",
            schema_version: "1",
            createdAt: "2023-11-27T14:46:13.705Z",
            updatedAt: "2024-03-06T10:47:26.913Z",
            __v: 0,
            dataspaceConnectorAppKey:
                "60302602dd21b879636317d54886f0181dd409f7f962d2a40a282f8cd099dad0837c86ddaa78a82c650a6d18347767a4c8f2532568ead3d267bf78e262a89444",
            dataspaceEndpoint: "http://host.docker.internal:3333/",
        },
        controllerDetails: {
            name: "http://host.docker.internal:4040/v1/catalog/participants/6564abb5d853e8e05b132057",
            contact: "",
            representative: "",
            dpo: {
                name: "",
                contact: "",
            },
        },
        purposes: [
            {
                "@context":
                    "http://host.docker.internal:4040/v1/softwareresource",
                "@type": "SoftwareResource",
                _id: "65e737ed74f9e9026bd5edbb",
                providedBy: "6564aaebd853e8e05b1317c1",
                name: "CONSUMER PAYLOAD BIL",
                description: "desc",
                // @ts-ignore
                aggregationOf: [],
                copyrightOwnedBy: ["6564aaebd853e8e05b1317c1"],
                // @ts-ignore
                license: [],
                policy: [
                    {
                        "@context": {
                            xsd: "http://www.w3.org/2001/XMLSchema#",
                            description: {
                                "@id": "https://schema.org/description",
                                "@container": "@language",
                            },
                        },
                        "@id": "http://localhost:3000/static/references/rules/rule-access-4.json",
                        title: {
                            "@type": "xsd/string",
                            "@value": "Count",
                        },
                        uid: "rule-access-4",
                        name: "Count",
                        description: [
                            {
                                "@value":
                                    "MUST not use data for more than n times",
                                "@language": "en",
                            },
                        ],
                        policy: {
                            permission: [
                                {
                                    action: "use",
                                    target: "@{target}",
                                    constraint: [
                                        {
                                            leftOperand: "count",
                                            operator: "lt",
                                            rightOperand: "@{value}",
                                        },
                                    ],
                                },
                            ],
                        },
                        requestedFields: ["target", "value"],
                    },
                ],
                category: "5f8d9ea341184f59787e605a",
                locationAddress: [
                    {
                        countryCode: "World",
                        _id: "65e737ed74f9e9026bd5edbc",
                    },
                ],
                users_clients: 0,
                demo_link: "",
                relevant_project_link: "",
                schema_version: "1.1.0",
                usePII: false,
                isAPI: true,
                createdAt: "2024-03-05T15:19:09.387Z",
                updatedAt: "2024-03-05T15:19:09.426Z",
                __v: 0,
                representation: {
                    _id: "65e737ed74f9e9026bd5edc3",
                    resourceID: "65e737ed74f9e9026bd5edbb",
                    type: "REST",
                    url: "http://host.docker.internal:3332/users",
                    method: "none",
                    credential: "",
                    createdAt: "2024-03-05T15:19:09.429Z",
                    updatedAt: "2024-03-05T15:19:09.429Z",
                    __v: 0,
                },
                resource:
                    "http://host.docker.internal:4040/v1/catalog/softwareresources/65e737ed74f9e9026bd5edbb",
            },
        ],
        // @ts-ignore
        categoriesOfData: [],
        data: [
            {
                "@context": "http://host.docker.internal:4040/v1/dataresource",
                "@type": "DataResource",
                _id: "65e7383974f9e9026bd5ee6c",
                // @ts-ignore
                aggregationOf: [],
                name: "PROVIDER PAYLOAD BIL",
                description: "ded",
                copyrightOwnedBy: ["6564abb5d853e8e05b132057"],
                // @ts-ignore
                license: [],
                policy: [
                    {
                        "@context": {
                            xsd: "http://www.w3.org/2001/XMLSchema#",
                            description: {
                                "@id": "https://schema.org/description",
                                "@container": "@language",
                            },
                        },
                        "@id": "http://localhost:3000/static/references/rules/rule-access-4.json",
                        title: {
                            "@type": "xsd/string",
                            "@value": "Count",
                        },
                        uid: "rule-access-4",
                        name: "Count",
                        description: [
                            {
                                "@value":
                                    "MUST not use data for more than n times",
                                "@language": "en",
                            },
                        ],
                        policy: {
                            permission: [
                                {
                                    action: "use",
                                    target: "@{target}",
                                    constraint: [
                                        {
                                            leftOperand: "count",
                                            operator: "lt",
                                            rightOperand: "@{value}",
                                        },
                                    ],
                                },
                            ],
                        },
                        requestedFields: ["target", "value"],
                    },
                ],
                producedBy: "6564abb5d853e8e05b132057",
                // @ts-ignore
                exposedThrough: [],
                obsoleteDateTime: "",
                expirationDateTime: "",
                containsPII: false,
                anonymized_extract: "",
                archived: false,
                // @ts-ignore
                attributes: [],
                category: "5f8ed518651f1648e0d8162a",
                isPayloadForAPI: true,
                country_or_region: "World",
                entries: -1,
                // @ts-ignore
                subCategories: [],
                schema_version: "1",
                createdAt: "2024-03-05T15:20:25.375Z",
                updatedAt: "2024-03-05T15:20:25.423Z",
                __v: 0,
                representation: {
                    _id: "65e7383974f9e9026bd5ee73",
                    resourceID: "65e7383974f9e9026bd5ee6c",
                    fileType: "",
                    type: "REST",
                    url: "http://host.docker.internal:3331/users",
                    sqlQuery: "",
                    className: "",
                    method: "none",
                    credential: "",
                    createdAt: "2024-03-05T15:20:25.409Z",
                    updatedAt: "2024-03-05T15:20:25.409Z",
                    __v: 0,
                },
                apiResponseRepresentation: {
                    _id: "65e7383974f9e9026bd5ee78",
                    resourceID: "65e7383974f9e9026bd5ee6c",
                    fileType: "",
                    type: "REST",
                    url: "http://host.docker.internal:3331/users",
                    sqlQuery: "",
                    className: "",
                    method: "none",
                    credential: "",
                    createdAt: "2024-03-05T15:20:25.425Z",
                    updatedAt: "2024-03-05T15:20:25.425Z",
                    __v: 0,
                },
                resource:
                    "http://host.docker.internal:4040/v1/catalog/dataresources/65e7383974f9e9026bd5ee6c",
            },
            {
                "@context": "http://host.docker.internal:4040/v1/dataresource",
                "@type": "DataResource",
                _id: "65e71e4174f9e9026bd5dc41",
                aggregationOf: [],
                name: "PROVIDER PAYLOAD TEST",
                description: "desc",
                copyrightOwnedBy: [
                    "http://host.docker.internal:4040/v1/catalog/participants/http://host.docker.internal:4040/v1/catalog/participants/6564abb5d853e8e05b132057",
                ],
                license: [],
                policy: [
                    {
                        "@context": {
                            xsd: "http://www.w3.org/2001/XMLSchema#",
                            description: {
                                "@id": "https://schema.org/description",
                                "@container": "@language",
                            },
                        },
                        "@id": "http://localhost:3000/static/references/rules/rule-access-1.json",
                        title: {
                            "@type": "xsd/string",
                            "@value": "No Restriction",
                        },
                        uid: "rule-access-1",
                        name: "No Restriction",
                        description: [
                            {
                                "@value":
                                    "CAN use data without any restrictions",
                                "@language": "en",
                            },
                        ],
                        policy: {
                            permission: [
                                {
                                    action: "use",
                                    target: "@{target}",
                                    constraint: [],
                                },
                            ],
                        },
                        requestedFields: ["target"],
                    },
                ],
                producedBy: "6564abb5d853e8e05b132057",
                exposedThrough: [],
                obsoleteDateTime: "",
                expirationDateTime: "",
                containsPII: true,
                anonymized_extract: "",
                archived: false,
                attributes: [],
                category: "648353e51d2c11adaae558c1",
                isPayloadForAPI: true,
                country_or_region: "World",
                entries: -1,
                subCategories: [],
                schema_version: "1",
                createdAt: "2024-03-05T13:29:37.061Z",
                updatedAt: "2024-03-27T14:08:19.986Z",
                __v: 0,
                representation: {
                    _id: "65e71e4174f9e9026bd5dc48",
                    resourceID: "65e71e4174f9e9026bd5dc41",
                    fileType: "",
                    type: "REST",
                    url: "http://host.docker.internal:3331/users/{userId}",
                    sqlQuery: "",
                    className: "",
                    method: "none",
                    credential: "",
                    createdAt: "2024-03-05T13:29:37.122Z",
                    updatedAt: "2024-03-27T14:08:20.010Z",
                    __v: 0,
                },
                apiResponseRepresentation: {
                    _id: "65e71e4174f9e9026bd5dc4d",
                    resourceID: "65e71e4174f9e9026bd5dc41",
                    fileType: "",
                    type: "REST",
                    url: "http://host.docker.internal:3331/users/{userId}",
                    sqlQuery: "",
                    className: "",
                    method: "none",
                    credential: "",
                    createdAt: "2024-03-05T13:29:37.141Z",
                    updatedAt: "2024-03-27T14:08:20.009Z",
                    __v: 0,
                },
                resource:
                    "http://host.docker.internal:4040/v1/catalog/dataresources/65e71e4174f9e9026bd5dc41",
            },
        ],
        recipients: [
            {
                "@context": "http://host.docker.internal:4040/v1/participant",
                "@type": "Participant",
                _id: "6564aaebd853e8e05b1317c1",
                // @ts-ignore
                did: null,
                legalName: "participatnOne",
                legalPerson: {
                    registrationNumber: "",
                    headquartersAddress: {
                        countryCode: "",
                    },
                    legalAddress: {
                        countryCode: "",
                    },
                    // @ts-ignore
                    parentOrganization: [],
                    // @ts-ignore
                    subOrganization: [],
                },
                termsAndConditions: "",
                associatedOrganisation: "6564aaebd853e8e05b1317c0",
                schema_version: "1",
                createdAt: "2023-11-27T14:42:51.838Z",
                updatedAt: "2024-04-10T13:19:20.296Z",
                __v: 0,
                dataspaceConnectorAppKey:
                    "5fc1ea45b47ffae6f74f512ff341ce71835f39ff0f30c03473620184aa9b97574256bf0d91be5399c971c0e682eded560885d69d059bcfeb3e975f6c963945e9",
                dataspaceEndpoint: "http://host.docker.internal:3334/",
            },
        ],
        internationalTransfers: {
            // @ts-ignore
            countries: [],
            safeguards: "",
        },
        retentionPeriod: "",
        // @ts-ignore
        piiPrincipalRights: [],
        withdrawalOfConsent: "",
        complaintRights: "",
        provisionRequirements: "",
        automatedDecisionMaking: {
            details: "",
        },
        schema_version: "0.1.0",
        createdAt: "2024-04-12T12:17:10.799Z",
        updatedAt: "2024-04-12T13:25:43.296Z",
        __v: 1,
        consumerEmail: false,
    },
};

export const ConsentProvider = ({
    visible = false,
    privacyNoticeEndpoint,
    PDCAdminJWT,
    sessionCheckEndpoint,
    userIdentifier,
    branding,
    demo = false,
    onCancel,
    children,
    enableToggle,
}: PropsWithChildren<ConsentProviderProps>) => {
    // States for modal visible and content
    const [modalVisible, setModalVisible] = useState<boolean>(visible);
    const [enableDataToggle, setEnableDataToggle] =
        useState<boolean>(enableToggle);
    const [modalContent, setModalContent] = useState<ModalContent>("sharing");
    const [selectedDataResource, setSelectedDataResource] = useState<string[]>(
        []
    );

    // States for give the current privacy notice
    const [privacyNotice, setPrivacyNotice] = useState<PrivacyNotice>(
        // @ts-ignore
        demo ? demoResponse?.content : null
    );
    const [privacyNotices, setPrivacyNotices] = useState<PrivacyNotice[]>();
    const [availableExchanges, setAvailableExchanges] =
        useState<AvailableExchanges>();
    const [availableExchangesPopulate, setAvailableExchangesPopulate] =
        useState<AvailableExchangesPopulate[]>();
    const [
        currentAvailableExchangeSelected,
        setCurrentAvailableExchangeSelected,
    ] = useState<string>();
    const [currentPrivacyNoticeSelected, setCurrentPrivacyNoticeSelected] =
        useState<string>();

    const [userInformation, setUserInformation] = useState<UserInformation>({
        email: "",
        trigger: false,
    });

    // API State for trigger loader
    const [apiStates, setApiStates] = useState<APIStates>({
        iddle: false,
        loading: false,
        error: false,
    });

    const connectorPivateURL =
        "https://provider-data-connector-253244a6c16c.herokuapp.com/private";

    const updateAvailableExchangeSelected = (exchangeId: string) => {
        setCurrentAvailableExchangeSelected(exchangeId);
    };

    const updatePrivacyNoticeSelected = (privacyNoticeId: string) => {
        setCurrentPrivacyNoticeSelected(privacyNoticeId);
    };

    const updateModalContent = (modalContent: ModalContent) => {
        setModalContent(modalContent);
    };

    const updateSelectedDataResource = (resource: string) => {
        const findIndex = selectedDataResource.findIndex(
            (el) => el === resource
        );
        if (findIndex === -1) {
            setSelectedDataResource((prev) => [...prev, resource]);
        } else {
            setSelectedDataResource((prev) => [
                ...selectedDataResource.filter((el) => el !== resource),
            ]);
        }
    };

    const updateUserInformation = (
        key: "email" | "trigger",
        value: string | boolean
    ) => {
        setUserInformation((prev) => ({ ...prev, [key]: value }));
    };

    const onConsent = async () => {
        if (!sessionCheckEndpoint) {
            alert("Please provide a valid session check endpoint.");
            return;
        }
        if (
            userInformation.email &&
            !APP_REGEX.email.test(userInformation.email)
        ) {
            alert("Please input a valid email.");
            return;
        }
        setApiStates({ loading: true, error: false, iddle: false });

        const payload = {
            privacyNoticeId: privacyNotice?._id,
            userId: userIdentifier,
            email: userInformation.email || "",
            data:
                selectedDataResource.length > 0
                    ? selectedDataResource
                    : privacyNotice.data.map((el) => el.resource),
        };
        console.log(JSON.stringify(payload));

        try {
            const res = await fetch(sessionCheckEndpoint, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "content-type": "application/json",
                },
            });
            if (res?.ok) {
                setApiStates({ loading: false, error: false, iddle: false });
                setModalContent("success");
            } else {
                setApiStates({ loading: false, error: true, iddle: false });
                throw new Error("Failed to agree the current consent.");
            }
        } catch (error) {
            console.error(error);
            setApiStates({ loading: false, error: true, iddle: false });
            throw new Error("Failed to agree the current consent.");
        } finally {
            setApiStates({ loading: false, error: false, iddle: false });
        }
    };

    useEffect(() => {
        setModalVisible(visible);
    }, [visible]);

    useEffect(() => {
        if (demo) return;
        if (!privacyNoticeEndpoint) return;
        let isMounted = true;

        const getPrivacyNotice = async () => {
            try {
                const response = await fetch(privacyNoticeEndpoint, {
                    headers: {
                        Authorization: `Bearer ${PDCAdminJWT}`,
                    },
                });
                const json = await response.json();
                if (json?.code !== 200) {
                    isMounted = false;
                    return;
                }
                if (isMounted) setPrivacyNotice(json?.content);
            } catch (error) {
                console.error(error);
                isMounted = false;
            }
        };

        getPrivacyNotice();

        return () => {
            isMounted = false;
        };
    }, [privacyNoticeEndpoint, PDCAdminJWT, demo]);

    useEffect(() => {
        if (demo) return;
        if (privacyNoticeEndpoint) return;
        let isMounted = true;
        setApiStates({ loading: true, iddle: false, error: false });

        const getPopulatedContracts = async (exchanges: Exchanges[]) => {
            const exchangePromises = exchanges?.map(async (exchange) => {
                const participantSelfDescription = async () => {
                    const checkUrl =
                        exchange?.participantSelfDescription?.includes("https");

                    if (!checkUrl) return;

                    const participant = await fetch(
                        exchange?.participantSelfDescription
                    );
                    const jsonParticipant = await participant.json();
                    return jsonParticipant;
                };

                const consumer = await participantSelfDescription();
                if (!consumer) return null;

                const res = await fetch(exchange?.contract);
                const contracts = await res.json();

                const fetchDataPromises = [];

                for (const key in contracts) {
                    if (
                        key === "dataProvider" ||
                        key === "dataConsumer" ||
                        key === "ecosystem"
                    ) {
                        fetchDataPromises.push(
                            (async () => {
                                const res = await fetch(contracts[key]);
                                contracts[key] = await res.json();
                            })()
                        );
                    }
                }

                await Promise.all(fetchDataPromises);

                return {
                    consumer,
                    contracts,
                };
            });

            const exchangeContracts = await Promise.all(exchangePromises);

            const validExchangeContracts: AvailableExchangesPopulate[] =
                exchangeContracts.filter(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (exchange: { consumer: any; contracts: any } | null) =>
                        exchange !== null
                );

            const removeDuplicates = (arr: AvailableExchangesPopulate[]) => {
                const unique: AvailableExchangesPopulate[] = [];
                arr?.forEach((el) => {
                    if (!el.consumer) return;
                    if (
                        unique?.find(
                            (u) => u?.contracts?._id === el?.contracts?._id
                        )
                    )
                        return;
                    else unique.push(el);
                });

                return unique;
            };

            return removeDuplicates(validExchangeContracts);
        };

        const getAvailableExchanges = async () => {
            try {
                const response = await fetch(
                    `${connectorPivateURL}/consent/exchanges/provider`,
                    {
                        headers: {
                            Authorization: `Bearer ${PDCAdminJWT}`,
                        },
                    }
                );
                const json = await response.json();
                if (json?.code !== 200) {
                    isMounted = false;
                    setApiStates({ loading: false, iddle: false, error: true });
                    return;
                }
                const populateExchanges = await getPopulatedContracts(
                    json?.content?.exchanges
                );
                if (isMounted) {
                    setAvailableExchanges(json?.content);
                    setAvailableExchangesPopulate(populateExchanges);
                    setApiStates({
                        loading: false,
                        iddle: false,
                        error: false,
                    });
                }
            } catch (error) {
                setApiStates({ loading: false, iddle: false, error: true });
                console.error(error);
                isMounted = false;
            } finally {
                setApiStates({ loading: false, iddle: false, error: false });
            }
        };

        getAvailableExchanges();
        setModalContent("chooseExchange");

        return () => {
            setApiStates({ loading: false, iddle: false, error: false });
            isMounted = false;
        };
    }, [privacyNoticeEndpoint, PDCAdminJWT, demo]);

    useEffect(() => {
        if (demo) return;
        if (privacyNotice) return;
        if (!currentAvailableExchangeSelected) return;
        if (!availableExchanges) return;
        let isMounted = true;

        const currentExchange = availableExchanges?.exchanges?.find(
            (ex: Exchanges) =>
                ex?.contract?.includes(currentAvailableExchangeSelected)
        );
        const currentPrivacyNoticeEndPoint: string =
            currentExchange?.privacyNoticeEndpoint?.replace(
                "{userId}",
                userIdentifier
            ) || "";

        const populatedPrivacyNotice = async (notices: PrivacyNotice[]) => {
            try {
                const noticesPromises = notices?.map(async (notice) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const recipientsPromises = notice?.recipients?.map(
                        async (r: any) => {
                            if (!r) return;
                            const res = await fetch(r);
                            const json = await res.json();
                            return json;
                        }
                    );
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const purposesPromises = notice?.purposes?.map(
                        async (p: any) => {
                            if (!p?.resource) return;
                            const res = await fetch(p?.resource);
                            const json = await res.json();
                            return json;
                        }
                    );

                    const recipients = await Promise.all(recipientsPromises);
                    const purposes = await Promise.all(purposesPromises);

                    notice.recipients = recipients;
                    notice.purposes = purposes;

                    return notice;
                });

                return await Promise.all(noticesPromises);
            } catch (error) {
                if (isMounted) isMounted = false;
                console.error(error);
                throw new Error(
                    "Failed to populate the current privacy notice"
                );
            }
        };

        const getPrivacyNotices = async () => {
            setApiStates({ loading: true, error: false, iddle: false });
            setModalContent("choosePrivacyNotice");

            try {
                const res = await fetch(currentPrivacyNoticeEndPoint, {
                    headers: {
                        Authorization: `Bearer ${PDCAdminJWT}`,
                    },
                });
                const json = await res.json();
                if (json?.code !== 200) {
                    if (isMounted) isMounted = false;
                    return;
                }

                const populate = await populatedPrivacyNotice(json?.content);
                if (populate) {
                    setPrivacyNotices(populate);
                }
            } catch (error) {
                setApiStates({ loading: false, error: true, iddle: false });
                if (isMounted) isMounted = false;
                console.error(error);
                throw new Error("Failed to fetch the current privacy notices");
            } finally {
                setApiStates({ loading: false, error: false, iddle: false });
            }
        };

        getPrivacyNotices();

        return () => {
            isMounted = false;
        };
    }, [
        currentAvailableExchangeSelected,
        availableExchanges,
        PDCAdminJWT,
        userIdentifier,
        demo,
        privacyNotice,
    ]);

    useEffect(() => {
        if (demo) return;
        if (privacyNoticeEndpoint) return;
        if (!currentPrivacyNoticeSelected) return;
        let isMounted = true;

        const getPrivacyNotice = async () => {
            setApiStates({ loading: true, error: false, iddle: false });
            setModalContent("choosePrivacyNotice");

            try {
                const res = await fetch(
                    `${connectorPivateURL}/consent/${userIdentifier}/privacy-notices/${currentPrivacyNoticeSelected}`
                );
                const json = await res.json();

                if (json?.code !== 200) {
                    if (isMounted) isMounted = false;
                    return;
                }
                if (isMounted) {
                    setPrivacyNotice(json?.content);
                    setModalContent("sharing");
                }
            } catch (error) {
                setApiStates({ loading: false, error: true, iddle: false });
                if (isMounted) isMounted = false;
                console.error(error);
                throw new Error("Failed to fetch the current privacy notice.");
            } finally {
                setApiStates({ loading: false, error: false, iddle: false });
            }
        };

        getPrivacyNotice();

        return () => {
            setApiStates({ loading: false, error: false, iddle: false });
            isMounted = false;
        };
    }, [
        currentPrivacyNoticeSelected,
        privacyNoticeEndpoint,
        PDCAdminJWT,
        userIdentifier,
        demo,
    ]);

    return (
        <ConsentContext.Provider
            value={{
                modalVisible,
                privacyNotice,
                privacyNotices,
                modalContent,
                branding,
                availableExchanges,
                availableExchangesPopulate,
                apiStates,
                updateAvailableExchangeSelected,
                updatePrivacyNoticeSelected,
                updateModalContent,
                updateUserInformation,
                onCancel,
                onConsent,
                enableDataToggle,
                selectedDataResource,
                updateSelectedDataResource,
            }}
        >
            {children}
        </ConsentContext.Provider>
    );
};
