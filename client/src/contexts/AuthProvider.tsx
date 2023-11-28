import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SessionStorageKeys } from "../config/storage.config";
// import { useClient } from "react-api-client-provider";

type ContextValue = {
    user: any | null;
    login: () => void;
    update: () => void;
    logout: () => void;
    sessionExpired: () => void;
};

const AuthContext = createContext<ContextValue>({
    user: null,
    login: () => {},
    update: () => {},
    logout: () => {},
    sessionExpired: () => {},
});

export const AuthProvider = ({
    children,
    userData,
}: PropsWithChildren<{ userData: any }>) => {
    const [user, setUser] = useLocalStorage("user", userData);
    const navigate = useNavigate();
    // const { client } = useClient();

    const setUserFromServer = useCallback(async () => {
        // const data = await client.GET(`/users/me`);
        const data = { id: "123", email: "foo@bar.com" };
        setUser(data);
        return data;
    }, [setUser]);

    const login = useCallback(setUserFromServer, [setUserFromServer]);
    const update = useCallback(setUserFromServer, [setUserFromServer]);

    const logout = useCallback(async () => {
        // try {
        //     client.DELETE("/auth/logout");
        // } catch (e) {
        //     console.log(e);
        // }
        setUser(null);
        navigate("/", { replace: true });
    }, [navigate, setUser]);

    const sessionExpired = useCallback(() => {
        // try {
        //     client.DELETE("/auth/logout");
        // } catch (e) {
        //     console.log(e);
        // }
        sessionStorage.setItem(
            SessionStorageKeys.locationBeforeSessionExpiration,
            window.location.pathname
        );
        sessionStorage.setItem(SessionStorageKeys.sessionExpired, "true");
        setUser(null);
    }, [navigate, setUser]);

    const value = useMemo(
        () => ({
            user,
            login,
            update,
            logout,
            sessionExpired,
        }),
        [user, login, update, logout, sessionExpired]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
