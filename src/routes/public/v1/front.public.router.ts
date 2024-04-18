import { Router } from "express";
import axios from "axios";

const r: Router = Router();

r.get("/", async (req, res) => {
    try {
        const userId = "65646d4320ec42ff2e719706";
        const DSCAdminJWT =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlS2V5IjoiMXRBVGlLN0UzQTFIM2Rfd0lpVVhPdExDS2tXWlpLQV9wMlgwZ3drRG1GeHBmQ0Y0STNJc2xyZG1rUERfMzhhVFRyQXpJUVVMaXhVV2NCSWxCRnlCY3lVOHN4RFJVWk1YX09UYyIsIm9yaWdpbiI6Imh0dHBzOi8veW91ci11cmwuY29tIiwiaWF0IjoxNzEyNTY3ODUzMTk5fQ.Lh8M8EF8caRtdcFuY9P2bE2qFEvJl0odzJ1A49n0HwY";
        const origin = req.headers["x-forwarded-proto"]
            ? `${req.headers["x-forwarded-proto"]}://${req.headers.host}`
            : req.headers.host;

        const url = "http://localhost:3333";

        //get available exchanges
        const exchangesResponse = await axios.get(
            `${url}/private/pdi/exchanges/provider`,
            {
                headers: {
                    origin,
                    Authorization: `Bearer ${DSCAdminJWT}`,
                },
            }
        );

        //get privacy notices
        const privacyNoticesResponse = await axios.get(
            `${url}/private/pdi/${userId}/${exchangesResponse.data.content.participant.base64SelfDescription}/${exchangesResponse.data.content.exchanges[0].base64SelfDescription}`,
            {
                headers: {
                    origin,
                    Authorization: `Bearer ${DSCAdminJWT}`,
                },
            }
        );

        res.render("index", {
            userId,
            DSCAdminJWT,
            privacyNoticeEndpoint: `${url}/private/consent/${userId}/privacy-notices/${privacyNoticesResponse.data.content[3]._id}`,
        });
    } catch (e) {
        res.render("error", {
            error: e,
        });
    }
});

export default r;
