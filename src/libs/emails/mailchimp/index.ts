import mailchimp from "@mailchimp/mailchimp_transactional";
import { config } from "../../../config/environment";
import { MailchimpEmailClient } from "./classes/MailchimpEmailClient";

const { mandrillAPIKey, mandrillFromMail, mandrillFromName } =
    config.emails.mailchimp;

const client = mailchimp(mandrillAPIKey);

/**
 * The global app instance for email management
 * through mailchimp & more specifically mandrill
 */
export const MailchimpClient = mandrillAPIKey
    ? new MailchimpEmailClient(client, mandrillFromMail, mandrillFromName)
    : new MailchimpEmailClient(null);
