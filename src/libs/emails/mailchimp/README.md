# Setting up mailchimp for transactional emails

First step is having an account for mailchimp and then using it to login to mandrill via mailchimp to setup [sending-domains](https://mandrillapp.com//settings/sending-domains).

## [Demo mode](https://mailchimp.com/en/help/transactional-email-demo/)

For dev, we have a "demo" mode of 500 emails that have the following constraints:

-   Each eligible Mailchimp account may only enroll in the demo once.
-   You can send up to 500 transactional emails to any email address on your verified domain. Read more about domain verification and authentication here.
-   You can send up to 25 emails in an hour and receive up to 100 inbound emails per day.
-   The emails included with the demo do not expire or renew.
-   Click tracking is not enabled for demo accounts.
-   Your transactional email history is stored for only 30 days. After that, you will not be able to see the contents of the transactional emails or to whom the emails were sent.

You immediately lose access to the demo if:

-   Your Mailchimp account is paused or closed.
-   You have a compliance hold.
-   You send 500 emails.

## Activation

If environment variable for MANDRILL_API_KEY is not set, the MailchimpClient will not be activated. When not activated, sendMessage methods will not trigger and return void.

## Example usage

### Sending an email

```js
await MailchimpClient.sendMessage({
    message: {
        to: [
            {
                email: "recipient1@email.com",
                name: "John Doe",
            },
        ],
        html: "<h1>Hello world</h1>",
    },
});
```

### Sending an email using a local template

```js
await MailchimpClient.sendMessageFromLocalTemplate(
    {
        message: {
            to: [
                {
                    email: "recipient1@email.com",
                    name: "John Doe",
                },
            ],
        },
    },
    "myTemplate",
    { foo: "foo", bar: "bar" }
);
```

## Packages to install

Just in case the decision is shifted from using another mailer to mailchimp while on this template, here are the necessary packages

`pnpm add @mailchimp/mailchimp_transactional && pnpm add -D @types/mailchimp__mailchimp_transactional`
