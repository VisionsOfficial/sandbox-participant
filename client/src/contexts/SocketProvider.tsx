import { io, Socket } from "socket.io-client";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useMemo,
    useState,
} from "react";
import { config } from "../config/environment.config";

const SocketContext = createContext<{
    socket: Socket;
}>({ socket: io(config.apiURL) });

export const SocketProvider = ({ children }: PropsWithChildren) => {
    const [socket, setSocket] = useState<Socket>(io(config.apiURL));

    const value = useMemo(
        () => ({
            socket,
        }),
        [socket]
    );

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context)
        throw new Error("useSocket should be used within a SocketProvider.");

    return context;
};
