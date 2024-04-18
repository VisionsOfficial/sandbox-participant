import React, {
    CSSProperties,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";
import Styles from "./Flex.module.scss";
import { FlexJustify } from "../../../types";

type FlexProps = React.DetailedHTMLProps<
    React.HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    vertical?: boolean;
    reverse?: boolean;
    wrap?: "wrap" | "nowrap";
    justify?: FlexJustify;
    align?: "flex-start" | "center" | "flex-end" | "stretch";
    gap?: "small" | "medium" | "large" | number;
    className?: string;
    responsive?: ResponsiveFlex[];
    style?: CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

type ResponsiveFlex = {
    breakpoint: number;
    settings: {
        vertical?: boolean;
        wrap?: "wrap" | "nowrap";
        justify?:
            | "flex-start"
            | "center"
            | "flex-end"
            | "stretch"
            | "space-between"
            | "space-around"
            | "space-evenly";
        align?: "flex-start" | "center" | "flex-end" | "stretch";
        gap?: "small" | "medium" | "large" | number;
    };
};

export const Flex = (props: PropsWithChildren<FlexProps>) => {
    const {
        vertical = false,
        reverse = false,
        wrap = "nowrap",
        justify = "flex-start",
        align = "flex-start",
        className = "",
        responsive = [],
        gap,
        style,
        onClick,
        children,
    } = props;

    const [propsState, setPropsState] = useState<FlexProps>({
        vertical,
        wrap,
        justify,
        align,
        gap,
    });

    const setGap = () => {
        switch (propsState.gap) {
            case "small":
                return 8;
            case "medium":
                return 16;
            case "large":
                return 24;
            default:
                return propsState.gap;
        }
    };

    useEffect(() => {
        if (!responsive?.length) return;

        const handleResize = () => {
            const newBreakpoint = window.innerWidth;

            const checkBreakpoint = responsive
                .sort((a, b) => a.breakpoint - b.breakpoint)
                .find((resp) => newBreakpoint <= resp.breakpoint);

            setPropsState((prev) => {
                if (checkBreakpoint) {
                    return {
                        ...prev,
                        vertical: checkBreakpoint?.settings?.vertical
                            ? checkBreakpoint.settings.vertical
                            : false,
                        wrap: checkBreakpoint?.settings?.wrap
                            ? checkBreakpoint.settings.wrap
                            : "nowrap",
                        justify: checkBreakpoint?.settings?.justify
                            ? checkBreakpoint.settings.justify
                            : "flex-start",
                        align: checkBreakpoint?.settings?.align
                            ? checkBreakpoint.settings.align
                            : "flex-start",
                        gap: checkBreakpoint?.settings?.gap
                            ? checkBreakpoint.settings.gap
                            : gap,
                    };
                } else {
                    return { ...prev, vertical, wrap, justify, align, gap };
                }
            });
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [responsive, align, gap, justify, vertical, wrap]);

    return (
        <div
            className={`${Styles.Flex} ${className}`}
            onClick={(e) => onClick && onClick(e)}
            style={{
                flexDirection:
                    propsState.vertical && reverse
                        ? "column-reverse"
                        : propsState.vertical && !reverse
                        ? "column"
                        : reverse && !propsState.vertical
                        ? "row-reverse"
                        : "row",
                justifyContent: propsState.justify,
                alignItems: propsState.align,
                flexWrap: propsState.wrap,
                gap: setGap(),
                ...style,
            }}
        >
            {children}
        </div>
    );
};
