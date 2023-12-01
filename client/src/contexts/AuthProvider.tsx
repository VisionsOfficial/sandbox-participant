import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LocalStorageKeys, SessionStorageKeys } from "../config/storage.config";
import { useClient } from "react-api-client-provider";

type ContextValue = {
    user: any | null;
    login: (email: string, password: string) => void;
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
    const { client } = useClient();

    const setUserFromServer = useCallback(async () => {
        try {
            const res = await client.GET({
                url: `/v1/users/me`,
                withCredentials: true,
            });
            const data = res.data;
            setUser(data?.user);
            localStorage.setItem(
                LocalStorageKeys.user,
                JSON.stringify(data?.user)
            );
            localStorage.setItem(LocalStorageKeys.userToken, data?.token);
            return data;
        } catch (err) {
            console.error(err);
            setUser(null);
        }
    }, [setUser]);

    const update = useCallback(setUserFromServer, [setUserFromServer]);

    const login = async (email: string, password: string) => {
        const res = await client.POST({
            url: "/v1/auth/login",
            data: { email, password },
        });
        const data = res.data;
        setUser(data?.data?.user);
        localStorage.setItem(
            LocalStorageKeys.user,
            JSON.stringify(data?.data?.user)
        );
        localStorage.setItem(LocalStorageKeys.userToken, data?.data?.token);
        return data;
    };

    const logout = useCallback(async () => {
        try {
            client.DELETE({ url: "/v1/auth/logout" });
        } catch (e) {
            console.log(e);
        }
        setUser(null);
        localStorage.setItem(LocalStorageKeys.user, "null");
        localStorage.setItem(LocalStorageKeys.userToken, "null");
        navigate("/", { replace: true });
    }, [navigate, setUser]);

    const sessionExpired = useCallback(() => {
        try {
            client.DELETE({ url: "/v1/auth/logout" });
        } catch (e) {
            console.log(e);
        }
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

    useEffect(() => {
        console.log({ userChanged: user });
    }, [user]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
