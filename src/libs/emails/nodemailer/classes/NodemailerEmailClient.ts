import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { Logger } from "../../../loggers";
import { EmailTemplates } from "../../templates";
import { ERROR_CODES } from "../../../../errors/ErrorCodes";
import { config } from "../../../../config/environment";
import { NodemailerEmailClientError } from "./NodemailerEmailClientError";

export class NodemailerEmailClient {
    transporter: Transporter;

    /**
     * If the env config for EMAIL_PROVIDER is Nodemailer
     * then this client will be activated, otherwise, it wont
     */
    activated: boolean;

    constructor() {
        const { service, user, pass } = config.emails.nodemailer;
        this.activated = !!service && !!user && !!pass;

        if (!this.activated) {
            this.transporter = null;
            return;
        }

        this.transporter = nodemailer.createTransport({
            service,
            auth: {
                user,
                pass,
            },
        });
    }

    /**
     * Send email through nodemailer with provided options
     */
    async sendMessage(options: SendMailOptions) {
        if (!this.activated) return;

        try {
            const res = await this.transporter.sendMail(options);
            return res;
        } catch (err) {
            Logger.error({
                location: "MailchimpEmailClient.sendMessage",
                message: err.message,
            });
            const nodemailerErr = new NodemailerEmailClientError({
                errorCode: ERROR_CODES.email0004,
                message: err.message,
            });
            nodemailerErr.name = err.name;
            nodemailerErr.stack = err.stack;
            throw nodemailerErr;
        }
    }

    /**
     * Send email through nodemailer using a local template and
     * populating with any variables existing in the template
     */
    async sendMessageFromLocalTemplate(
        options: SendMailOptions,
        templateName: keyof typeof EmailTemplates,
        variables?: { [key: string]: string }
    ) {
        if (!this.activated) return;

        try {
            const html = EmailTemplates[templateName](variables) || "";
            options.html = html;
        } catch (err) {
            Logger.error({
                location: "MailchimpEmailClient.sendMessageFromLocalTemplate",
                message: err.message,
            });
            const nodemailerErr = new NodemailerEmailClientError({
                errorCode: ERROR_CODES.email0005,
                message: err.message,
            });
            nodemailerErr.name = err.name;
            nodemailerErr.stack = err.stack;
            throw nodemailerErr;
        }

        return await this.sendMessage(options);
    }
}
