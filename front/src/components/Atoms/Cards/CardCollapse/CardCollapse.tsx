import React, { PropsWithChildren, useState } from "react";
import Styles from "./CardCollapse.module.scss";
import { Size } from "../../../../types";
import { Flex } from "../../Flex/Flex";
import { ChevronDownSVG } from "../../SVGs/ChevronDownSVG/ChevronDownSVG";

type classNamesCardCollapse = {
    main?: string;
    header?: string;
    headerWrapper?: string;
    body?: string;
    footer?: string;
    title?: string;
    avatar?: string;
    active?: {
        main?: string;
        header?: string;
        headerWrapper?: string;
        body?: string;
        footer?: string;
        title?: string;
        avatar?: string;
    };
};
type CardCollapseProps = {
    classNames?: classNamesCardCollapse;
    title?: string;
    description?: string;
    size?: Size;
    avatar?: React.ReactNode | { src: string; alt: string };
    bordered?: boolean;
    actions?: React.ReactNode;
    expandIcon?: React.ReactNode;
    expandIconPosition?: "end" | "start";
    style?: React.CSSProperties;
};
export const CardCollapse = ({
    classNames = {
        main: "",
        avatar: "",
        header: "",
        headerWrapper: "",
        body: "",
        footer: "",
        title: "",
        active: {
            main: "",
            avatar: "",
            header: "",
            headerWrapper: "",
            body: "",
            footer: "",
            title: "",
        },
    },
    title,
    description,
    bordered = false,
    size = "small",
    avatar,
    actions,
    expandIcon,
    expandIconPosition = "end",
    children,
}: PropsWithChildren<CardCollapseProps>) => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleSetClassNamesCard = () => {
        const border = bordered ? Styles.bordered : "";
        const sizing = {
            small: Styles.smallCardCollapse,
            middle: Styles.middleCardCollapse,
            large: Styles.largeCardCollapse,
        };

        return [
            Styles.CardCollapse,
            sizing[size],
            border,
            classNames.main,
        ].join(" ");
    };

    const handleDisplayAvatar = () => {
        if (!avatar) return null;

        if (typeof avatar === "object" && "src" in avatar) {
            return (
                <img
                    src={avatar.src}
                    alt={avatar.alt}
                    className={`${Styles.avatar} ${classNames.avatar}`}
                />
            );
        }

        return avatar;
    };

    const handleVisible = () => {
        setVisible((prev) => !prev);
    };

    return (
        <div className={handleSetClassNamesCard()}>
            <Flex
                vertical
                className={`${Styles.header} ${classNames.header}`}
                onClick={handleVisible}
            >
                <div
                    className={`${Styles.headerWrapper} ${
                        classNames.headerWrapper
                    } ${visible ? classNames.active?.headerWrapper : ""}`}
                    style={{
                        display: "flex",
                        flexDirection:
                            expandIconPosition === "start"
                                ? "row-reverse"
                                : "row",
                    }}
                >
                    {handleDisplayAvatar()}
                    <div className={Styles.details}>
                        <div className={`${Styles.title} ${classNames.title}`}>
                            {title}
                        </div>
                        {description && (
                            <p className={Styles.description}>{description}</p>
                        )}
                    </div>
                    {expandIcon ? (
                        expandIcon
                    ) : (
                        <ChevronDownSVG
                            style={
                                visible
                                    ? {
                                          transform: "rotate(-180deg)",
                                          transition: "transform 0.2s ease-in",
                                      }
                                    : {
                                          transform: "rotate(0deg)",
                                          transition: "transform 0.2s ease-in",
                                      }
                            }
                        />
                    )}
                </div>
            </Flex>
            <div
                className={`${classNames.body} ${Styles.wrapper} ${
                    visible ? Styles.isVisible : ""
                }`}
            >
                <div className={`${Styles.inner}`}>
                    <div>{children}</div>
                    {actions && (
                        <div
                            className={`${Styles.footer} ${classNames.footer}`}
                        >
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
