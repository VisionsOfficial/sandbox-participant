import { Router } from "express";
import axios from "axios";

const r: Router = Router();

r.get("/", async (req, res) => {
    try {
        const userId = "65646d4320ec42ff2e719706";
        const DSCAdminJWT =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlS2V5IjoiQTVkdzY5OHNuWGlKUlZmYjZjTTR1RDd3M2JDTWdhbllKZ2VIWmZERGNIcE41QnlESmJOUE1XQm50TktCYVhqTlJ6dVd6NzRRUDlHVU5ZWEdxR2plVWJNMzY3YUhaTnNaRlNKNCIsIm9yaWdpbiI6Imh0dHBzOi8vcHJvdmlkZXItYXBpLWE3MDc2NWEyMjBhNC5oZXJva3VhcHAuY29tIiwiaWF0IjoxNzEyMjQzMTA3NTg0fQ.uVY_D6L1jeighZgi024sUgyo3XvCj0q56YgXIb7HRaQ";

        //get available exchanges
        const exchangesResponse = await axios.get(
            "https://provider-data-connector-253244a6c16c.herokuapp.com/private/pdi/exchanges/provider",
            {
                headers: {
                    origin: `${req.headers["x-forwarded-proto"]}://${req.headers.host}`,
                    Authorization: `Bearer ${DSCAdminJWT}`,
                },
            }
        );

        //get privacy notices
        const privacyNoticesResponse = await axios.get(
            `https://provider-data-connector-253244a6c16c.herokuapp.com/private/pdi/${userId}/aHR0cHM6Ly9hcGkudmlzaW9uc3RydXN0LmNvbS92MS9jYXRhbG9nL3BhcnRpY2lwYW50cy82NTZkZmIzZTI4MmQ0N2NmYTZiNjZiMzA=/aHR0cHM6Ly9hcGkudmlzaW9uc3RydXN0LmNvbS92MS9jYXRhbG9nL3BhcnRpY2lwYW50cy82NTZkZmIzZTI4MmQ0N2NmYTZiNjZiMmE=`,
            {
                headers: {
                    origin: `${req.headers["x-forwarded-proto"]}://${req.headers.host}`,
                    Authorization: `Bearer ${DSCAdminJWT}`,
                },
            }
        );

        res.render("index", {
            userId,
            DSCAdminJWT,
            privacyNoticeEndpoint: `https://provider-data-connector-253244a6c16c.herokuapp.com/private/consent/${userId}/privacy-notices/65e9f407de244c2a18764332`,
        });
    } catch (e) {
        res.render("error", {
            error: e,
        });
    }
});

export default r;
