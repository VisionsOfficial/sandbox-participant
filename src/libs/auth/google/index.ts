import { OAuth2Client } from "google-auth-library";
import { config } from "../../../config/environment";

const { clientID, clientSecret, redirectURI } = config.oauth.google;

export const GoogleOAuthClient = new OAuth2Client({
    clientId: clientID,
    clientSecret,
    redirectUri: redirectURI,
});
