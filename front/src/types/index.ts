export type ModalContent =
    | "sharing"
    | "learnMore"
    | "legal"
    | "chooseExchange"
    | "choosePrivacyNotice"
    | "success";

export type ConsentModalBranding = {
    img?: {
        src: string;
        alt: string;
        size?: {
            width?: string;
            height?: string;
            translateY?: string;
        };
    };
    colors?: {
        primary: string;
        secondary: string;
        tertiary: string;
        gradient: string;
        bgOpacity: string;
        buttonText: {
            initial: string;
            hover: string;
        };
        active: {
            background: string;
            text: string;
        };
    };
};

export interface ConsentContextType {
    modalVisible: boolean;
    modalContent: ModalContent;
    branding?: ConsentModalBranding;
    privacyNotice?: PrivacyNotice;
    privacyNotices?: PrivacyNotice[];
    availableExchanges?: AvailableExchanges;
    availableExchangesPopulate?: AvailableExchangesPopulate[];
    apiStates: APIStates;
    updateAvailableExchangeSelected: (exchangeId: string) => void;
    updatePrivacyNoticeSelected: (privacyNoticeId: string) => void;
    updateModalContent: (modalContent: ModalContent) => void;
    updateUserInformation: (
        key: "email" | "trigger",
        value: string | boolean
    ) => void;
    onCancel: () => void;
    onConsent: () => void;
    enableDataToggle: boolean;
    selectedDataResource?: string[];
    updateSelectedDataResource: (resource: string) => void;
}

export type APIStates = {
    iddle: boolean;
    loading: boolean;
    error: boolean;
};

export type ButtonVariant =
    | "default"
    | "outline"
    | "primary"
    | "secondary"
    | "tertiary"
    | "quaternary";

export type Size = "small" | "middle" | "large";

export type ButtonShape = "default" | "circle" | "round";

export type FlexJustify =
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";

export interface AvailableExchanges {
    exchanges: Exchanges[];
    participant: {
        base64SelfDescription: string;
        selfDescription: string;
    };
}

export interface AvailableExchangesPopulate {
    consumer: Participant;
    contracts: {
        _id: string;
        dataProvider?: Participant;
        dataConsumer?: Participant;
        ecosystem?: Ecosystem;
    };
}

export interface PrivacyNotice {
    _id: string;
    dataProvider: {
        legalName: string;
        logo: string;
        dataspaceEndpoint: string;
        dataspaceConnectorAppKey: string;
        associatedOrganisation: string;
        legalPerson: {
            legalAddress: {
                countryCode: string;
            };
            headquatersAddress: {
                countryCode: string;
            };
            parentOrganization: [];
            registrationNumber: string;
            subOrganization: [];
        };
        termsAndConditions: string;
    };
    data: ServiceOffering[];
    purposes: ServiceOffering[];
    recipients: {
        _id: string;
        legalName: string;
        logo: string;
        dataspaceEndpoint: string;
        dataspaceConnectorAppKey: string;
    }[];
    piiPrincipalRights: [];
}

export type ServiceOffering = {
    _id: string;
    aggregationOf: string[];
    name: string;
    description: string;
    location: string;
    archived: boolean;
    businessModel: string[];
    dataProtectionRegime: string[];
    dataAccountExport: [];
    b2cDescription?: string;
    dataResources: {
        _id: string;
        aggregationOf: string[];
        archived: boolean;
        containsPII: boolean;
        category: string;
        name: string;
        description: string;
        country_or_region: string;
        b2cDescription?: string;
    }[];
    softwareResources: {
        _id: string;
        aggregationOf: string[];
        archived: boolean;
        usePII: boolean;
        category: string;
        name: string;
        description: string;
        b2cDescription?: string;
        jurisdiction?: string;
        retention_period?: string;
        recipient_third_parties?: RecipientThirdParties[];
    }[];
    providedBy: string;
    resource: string;
};

export type RecipientThirdParties = {
    party_id: string;
    party_address: string;
    party_email?: string;
    party_url?: string;
    party_phone?: string;
    party_name: string;
    party_role?: string;
    party_contact: object;
    party_type: string;
};

export type Participant = {
    _id: string;
    legalName: string;
    logo: string;
    dataspaceConnectorAppKey: string;
    dataspaceEndpoint: string;
};

export type Ecosystem = {
    _id: string;
    name: string;
    logo: string;
    description: string;
    country_or_region: string;
};

export type Exchanges = {
    base64SelfDescription: string;
    contract: string;
    privacyNoticeEndpoint: string;
    participantSelfDescription: string;
};

export type FormType = "signup" | "login";

export type UserInformation = {
    email?: string;
    trigger?: boolean;
};
