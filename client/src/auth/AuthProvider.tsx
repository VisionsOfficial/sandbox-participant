import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    DefinedUseQueryResult,
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    getSession,
    login as apiLogin,
    logout as apiLogout,
    register as apiRegister,
    AuthUserResponse,
    Credentials,
} from "./auth.api";
import { LOCAL_STORAGE_KEY, SESSION_STORAGE_KEY } from "../constants/storeKeys";
import { APP_LINK } from "../constants/appLinks";

type ContextValue = {
    /**
     * The user query from useQuery hook
     */
    query: DefinedUseQueryResult<AuthUserResponse | null, Error> | null;

    /**
     * The mutation for the user registration
     */
    mutationRegister: UseMutationResult<
        AuthUserResponse,
        Error,
        Credentials,
        unknown
    >;

    /**
     * The mutation for user login
     */
    mutationLogin: UseMutationResult<
        AuthUserResponse,
        Error,
        Credentials,
        unknown
    >;

    /**
     * The user session object containing the user and his access token
     * Is null if the user is not logged in
     */
    session: AuthUserResponse | null;

    /**
     * The shortcut for mutationLogin.mutate if no checks are needed on
     * the mutation
     */
    login: ({ email, password }: { email: string; password: string }) => void;

    /**
     * Shortcut for the mutationLogout.mutate
     */
    logout: () => void;

    /**
     * Shortcut for the mutationRegister.mutate
     */
    register: ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => void;

    /**
     * Shortcut for the mutationRefresh.mutate
     */
    refreshSession: () => void;
};

const AuthContext = createContext<ContextValue>({
    session: null,
} as ContextValue);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ["user"],
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        queryFn: getSession,
        initialData: null,
        retry: false,
    });

    const { data: session } = query;

    const onLogout = () => {
        queryClient.setQueryData(["user"], null);
        [LOCAL_STORAGE_KEY.user, LOCAL_STORAGE_KEY.userToken].forEach((key) => {
            localStorage.removeItem(key);
        });
        navigate("/");
    };

    const clientSessionExpired = () => {
        sessionStorage.setItem(
            SESSION_STORAGE_KEY.locationBeforeSessionExpiration,
            window.location.pathname
        );
        sessionStorage.setItem(SESSION_STORAGE_KEY.sessionExpired, "true");
        navigate("/");
    };

    const { mutate: mutationRefresh } = useMutation({
        mutationFn: getSession,
        onSuccess: (data) => {
            if (!data) {
                queryClient.setQueryData(["user"], null);
                clientSessionExpired();
                return null;
            }
            queryClient.setQueryData(["user"], data);
        },
        onError: () => {
            onLogout();
        },
    });

    const mutationLogin = useMutation({
        mutationFn: apiLogin,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);

            navigate(APP_LINK.private.home);
        },
    });

    const { mutate: mutationLogout } = useMutation({
        mutationFn: apiLogout,
        onSuccess: onLogout,
    });

    const mutationRegister = useMutation({
        mutationFn: apiRegister,
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);

            navigate(APP_LINK.private.home);
        },
    });

    useEffect(() => {
        console.log({ dataChanged: session });
        if (!session) {
            onLogout();
        } else {
            localStorage.setItem(
                LOCAL_STORAGE_KEY.user,
                JSON.stringify(session.user)
            );
            // localStorage.setItem(LOCAL_STORAGE_KEY.userToken, session.token);
        }
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                query,
                session,
                logout: mutationLogout,
                mutationLogin,
                mutationRegister,
                login: mutationLogin.mutate,
                register: mutationRegister.mutate,
                refreshSession: mutationRefresh,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
