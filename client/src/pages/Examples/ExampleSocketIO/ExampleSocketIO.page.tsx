import { useState } from "react";
import { useSocket } from "../../../contexts/SocketProvider";
import Styles from "./ExampleSocketIOPage.module.scss";
import { Button } from "../../../components/atoms/Buttons/Button/Button";
import { Input } from "../../../components/atoms/Inputs/Input/Input";
import { useEffectOnce } from "../../../hooks/useEffectOnce";

export const ExampleSocketIOPage = () => {
    const { socket } = useSocket();

    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffectOnce(() => {
        socket.on("connect", () => {
            console.log(`Connected with ${socket.id}`);
        });

        socket.on("receive-message", (data) => {
            setMessages((prev) => [...prev, data]);
        });
    });

    return (
        <div className={Styles.ExampleSocketIOPage}>
            <div>
                {messages.map((ev, i) => (
                    <div key={`ev${i}`}>{ev.message}</div>
                ))}
            </div>
            <hr />
            <div>
                <Input
                    type="text"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    value={message}
                />
                <Button
                    onClick={() => {
                        socket.emit("send-message", { message, foo: "bar" });
                        setMessage("");
                    }}
                >
                    Send event
                </Button>
            </div>
        </div>
    );
};
