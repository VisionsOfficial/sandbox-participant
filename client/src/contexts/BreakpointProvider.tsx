import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

const breakpoints = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
};

type BreakpointValue = "mobile" | "tablet" | "desktop";

interface BreakpointContextType {
    resolution: BreakpointValue;
}

const BreakpointContext = createContext<BreakpointContextType>({
    resolution: "desktop",
});

export const BreakpointProvider = ({ children }: PropsWithChildren) => {
    const [resolution, setResolution] = useState<BreakpointValue>("desktop");

    const calculateBreakpoint = (width: number): BreakpointValue => {
        if (width < breakpoints.tablet) return "mobile";
        if (width < breakpoints.desktop) return "tablet";
        return "desktop";
    };

    useEffect(() => {
        const handleResize = () => {
            const newBreakpoint = calculateBreakpoint(window.innerWidth);
            setResolution(newBreakpoint);
        };

        // Set the initial resolution
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <BreakpointContext.Provider value={{ resolution }}>
            {children}
        </BreakpointContext.Provider>
    );
};

export const useBreakpoint = () => {
    const context = useContext(BreakpointContext);

    if (!context)
        throw new Error(
            "useBreakpoint should be used within a BreakpointProvider."
        );

    return context;
};
