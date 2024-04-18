import React, { PropsWithChildren } from "react";
import Styles from "./CardCollapseSoftwareResource.module.scss";
import { CardCollapse } from "../../../Atoms/Cards/CardCollapse/CardCollapse";

type CardCollapseSoftwareResourceProps = {
    softwareResource?: any;
    details?: boolean;
};

export const CardCollapseSoftwareResource = ({
    softwareResource,
    details = false,
}: PropsWithChildren<CardCollapseSoftwareResourceProps>) => {
    return (
        <CardCollapse
            title={details ? "details" : softwareResource?.name}
            classNames={{
                main: Styles.CardCollapseSoftwareResource,
                active: {
                    headerWrapper: Styles.activeHeader,
                },
            }}
        >
            {!details && <p>{softwareResource?.description}</p>}
            {softwareResource?.b2cDescription && (
                <div>
                    <p className={Styles.textBold}>B2C description</p>
                    <p>{softwareResource?.b2cDescription}</p>
                </div>
            )}
            {softwareResource?.jurisdiction && (
                <div>
                    <p className={Styles.textBold}>Jurisdiction</p>
                    <p>{softwareResource?.jurisdiction}</p>
                </div>
            )}
            {softwareResource?.retention_period && (
                <div>
                    <p className={Styles.textBold}>Retiention period</p>
                    <p>{softwareResource?.retention_period}</p>
                </div>
            )}
            {softwareResource?.recipient_third_parties?.length > 0 && (
                <>
                    <p className={Styles.textBold}>Recipient third parties</p>
                    <div className={Styles.recipientThirdParties}>
                        {softwareResource?.recipient_third_parties?.map(
                            (rtp: any, i: number) => (
                                <React.Fragment key={rtp?.party_name + i}>
                                    <div>
                                        <p className={Styles.textBold}>
                                            Party name
                                        </p>
                                        <p>{rtp?.party_name}</p>
                                    </div>
                                    <div>
                                        <p className={Styles.textBold}>
                                            Party type
                                        </p>
                                        <p>{rtp?.party_type}</p>
                                    </div>
                                    <div>
                                        <p className={Styles.textBold}>
                                            Party address
                                        </p>
                                        <p>{rtp?.party_address}</p>
                                    </div>
                                    {rtp?.party_role && (
                                        <div>
                                            <p className={Styles.textBold}>
                                                Party role
                                            </p>
                                            <p>{rtp?.party_role}</p>
                                        </div>
                                    )}
                                    {rtp?.party_email && (
                                        <div>
                                            <p className={Styles.textBold}>
                                                Party email
                                            </p>
                                            <p>{rtp?.party_email}</p>
                                        </div>
                                    )}
                                    {rtp?.party_url && (
                                        <div>
                                            <p className={Styles.textBold}>
                                                Party url
                                            </p>
                                            <p>{rtp?.party_url}</p>
                                        </div>
                                    )}
                                    {rtp?.party_phone && (
                                        <div>
                                            <p className={Styles.textBold}>
                                                Party phone
                                            </p>
                                            <p>{rtp?.party_phone}</p>
                                        </div>
                                    )}
                                </React.Fragment>
                            )
                        )}
                    </div>
                </>
            )}
        </CardCollapse>
    );
};
