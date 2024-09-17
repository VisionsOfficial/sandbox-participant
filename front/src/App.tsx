import "./App.css";
import axios from "axios";
import { useState } from "react";

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
                    "1tATiK7E3A1H3d_wIiUXOtLCKkWZZKA_p2X0gwkDmFxpfCF4I3IslrdmkPD_38aTTrAzIQULixUWcBIlBFyBcyU8sxDRUZMX_OTc",
                // secretKey: "BG9QZQHj7o2UtXC",
                secretKey:
                    "ay_HiowSg_mVU1rQeZEyB31Clq3HUchXmhXclfrJih5HVQk2ueZEgDMiswvIZZNOGcXhO7pNVriv9nopcadWwDgEGy9Bt7f4TAsO",
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

export default App;
