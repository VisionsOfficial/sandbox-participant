import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
    const [url, setUrl] = useState(null);
    const [privacyNoticeId, setPrivacyNoticeId] = useState(null);
    const [userId, setUserId] = useState(null);

    const getIframe = async (privacyNoticeId?: string) => {
        console.log(privacyNoticeId);
        console.log(userId);
        if (!userId) {
            window.alert("need an user id to display the iframe");
        }
        const login = await axios.post(
            "https://provider-data-connector-253244a6c16c.herokuapp.com/login",
            {
                serviceKey:
                    "A5dw698snXiJRVfb6cM4uD7w3bCMganYJgeHZfDDcHpN5ByDJbNPMWBntNKBaXjNRzuWz74QP9GUNYXGqGjeUbM367aHZNsZFSJ4",
                secretKey: "BG9QZQHj7o2UtXC",
            }
        );

        const iframe = await axios.get(
            `https://provider-data-connector-253244a6c16c.herokuapp.com/private/pdi?userId=${userId}${
                privacyNoticeId ? `&privacyNoticeId=${privacyNoticeId}` : ""
            }`,
            {
                headers: {
                    Authorization: `Bearer ${login.data.content.token}`,
                },
            }
        );

        if (iframe.data.content.url) {
            setUrl(iframe.data.content.url);
        }
    };

    const closeIframe = () => {
        setUrl(null);
    };

    return (
        <>
            <div>
                <label htmlFor="privacyNoticeId">privacyNoticeId</label>
                <input
                    name="privacyNoticeId"
                    type="text"
                    onChange={(e) => setPrivacyNoticeId(e.target.value)}
                />
                <br></br>
                <label htmlFor="userId">userId</label>
                <input
                    name="userId"
                    type="text"
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <div>
                <button onClick={() => getIframe(privacyNoticeId)}>
                    privacy Notice
                </button>
                <button onClick={() => getIframe()}>no Privacy Notice</button>
                <button onClick={() => closeIframe()}>close Iframe</button>
            </div>

            {url && <iframe height="600" width="600" src={url}></iframe>}
        </>
    );
}

export default App;
