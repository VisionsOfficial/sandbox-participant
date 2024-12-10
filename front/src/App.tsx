import axios from "axios";
import { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
    const [url, setUrl] = useState(null);
    const [privacyNoticeId, setPrivacyNoticeId] = useState(null);
    const [userId, setUserId] = useState(null);

    const getIframe = async (privacyNoticeId?: string) => {
        if (!userId) {
            window.alert("need an user id to display the iframe");
        }
        const login = await axios.post(
            // "https://provider-data-connector-253244a6c16c.herokuapp.com/login",
            "http://localhost:3333/login",
            {
                // serviceKey:
                //     "A5dw698snXiJRVfb6cM4uD7w3bCMganYJgeHZfDDcHpN5ByDJbNPMWBntNKBaXjNRzuWz74QP9GUNYXGqGjeUbM367aHZNsZFSJ4",
                serviceKey:
                    "MLLgUPxnnZLxOAu5tbl_p9Bx_GKJFWJLVkic4jHOirGJjD_6zEbzcCosAhCw7zV_VA9fPYy_vdRkZLuebUAUoQgjAPZGPuI9zaXg",
                // secretKey: "BG9QZQHj7o2UtXC",
                secretKey:
                    "xxRfHgwyb8OGYVuvdn13fwa8glsaFFwzB12laHzqoPs0PFw7HcA1DP6X8wkqEfZ4feUTwfdXO9WHGzlPwstMrE4FJVllcIl5U4nG",
            }
        );

        const iframe = await axios.get(
            `http://localhost:3333/private/pdi?userId=${userId}${
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
