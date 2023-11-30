import {
    ApiClient,
    MessagesSendRequest,
} from "@mailchimp/mailchimp_transactional";
import { Logger } from "../../../loggers";
import { EmailTemplates } from "../../templates";
import { MailchimpEmailClientError } from "./MailchimpEmailClientError";
import { ERROR_CODES } from "../../../../errors/ErrorCodes";

export class MailchimpEmailClient {
    client: ApiClient;

    /**
     * Default "From Email"
     */
    baseFromMail: string;

    /**
     * Default "From Name"
     */
    baseFromName: string;

    /**
     * If the env config is set for mandrill API key
     * then this will be activated, otherwise, it wont
     */
    activated: boolean;

    constructor(client: ApiClient, fromMail?: string, fromName?: string) {
        this.client = client;
        this.activated = !!client;
        this.baseFromMail = fromMail || "";
        this.baseFromName = fromName || "";
    }

    private preSend(options: MessagesSendRequest) {
        options.message.from_email =
            options.message.from_email || this.baseFromMail;
        options.message.from_name =
            options.message.from_name || this.baseFromName;
        return options;
    }

    async sendMessage(options: MessagesSendRequest) {
        if (!this.activated) return;

        const res = await this.client.messages.send(this.preSend(options));

        if (res instanceof Error) {
            Logger.error({
                location: "MailchimpEmailClient.sendMessage",
                message: res.message,
            });
            const err = new MailchimpEmailClientError({
                errorCode: ERROR_CODES.email0002,
                message: res.message,
            });
            err.name = res.name;
            err.stack = res.stack;
            throw err;
        }

        return res;
    }

    async sendMessageFromLocalTemplate(
        options: MessagesSendRequest,
        templateName: keyof typeof EmailTemplates,
        variables?: { [key: string]: string }
    ) {
        if (!this.activated) return;

        const html = EmailTemplates[templateName](variables) || "";
        options.message.html = html;
        const res = await this.client.messages.send(this.preSend(options));

        if (res instanceof Error) {
            Logger.error({
                location: "MailchimpEmailClient.sendMessageFromLocalTemplate",
                message: res.message,
            });
            const err = new MailchimpEmailClientError({
                errorCode: ERROR_CODES.email0003,
                message: res.message,
            });
            err.name = res.name;
            err.stack = res.stack;
            throw err;
        }

        return res;
    }
}
