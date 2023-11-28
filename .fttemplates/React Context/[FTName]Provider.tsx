import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

const <FTName | capitalize>Context = createContext<{}>({});

export const <FTName | capitalize>Provider = ({ children }: PropsWithChildren) => {
    const [foo, setFoo] = useState(false);

    const value = useMemo(
        () => ({}),
        [foo],
    );

    return <<FTName | capitalize>Context.Provider value={value}>{children}</<FTName | capitalize>Context.Provider>;
};

export default <FTName | capitalize>Context;

export const use<FTName | capitalize> = () => {
    const context = useContext(<FTName | capitalize>Context);

    if (!context)
        throw new Error("use<FTName | capitalize> should be used within a <FTName | capitalize>Provider.");
    
    return context;
};
