# medusa-plugin-nodemailer

A notification service based on Nodemailer & Handlebars templating engine.

## Installation

To install, run the following command in your terminal:

```bash
npm install @lumot-eu/medusa-plugin-nodemailer
```

Add the following values to your `medusa-config.js` file:

```javascript
const plugins = [
    // ...
    {
        resolve: "@lumot-eu/medusa-plugin-nodemailer",
        options: {
            fromAddress: process.env.MAIL_FROM_ADDRESS,

            // This object is passed directly into nodemailer.createTransport(),
            // so any configuration options supported by nodemailer will work here.
            // For more details, see: https://nodemailer.com/smtp/#1-single-connection
            transport: {
                host: process.env.MAIL_SMTP_HOST,
                port: process.env.MAIL_SMTP_PORT,
                auth: {
                    user: process.env.MAIL_SMTP_USER,
                    pass: process.env.MAIL_SMTP_PASS,
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            },

            // Path to the directory where your email templates are stored
            templatesDir: "email-templates",

            // Path to the directory where your layouts are stored
            layoutsDir: "email-templates/_layouts",

            // Path to the directory where your partials are stored
            partialsDir: "email-templates/_partials",

            // The name or file path of a template within the `layoutsDir` that will be used as the default layout.
            // To disable the use of a default layout, you can provide a falsy value
            defaultLayout: "default.hbs",

            // Maps templates to MedusaJS events
            // Only events listed here will be subscribed to.
            templateMap: {
                // "eventName": {
                //   name: "templateName"
                //   subject: "E-mail subject"
                // }
                "order.placed": {
                    name: "order.placed",
                    subject: "Order confirmation",
                }, 
            },

            // Helper functions, or "helpers" can be registered with Handlebars
            // and used within templates. Helpers provide additional functionality to templates,
            // such as transforming output, iterating over data, and more.
            hbsHelpers: {
                // Example: A helper that divides two numbers
                // divide: function (a, b, opts) {
                //     return a / b;
                // },
                // Usage in template: {{#divide 50 2}}
            },
        },
    },
];
```

### E-mail templates

Templates for each event should be placed in a sub-directory matching the name specified in the templateMap: eg. `{templatesDir}/order.placed`. The sub-directory must contain two files: `html.hbs` for the HTML version and `txt.hbs` for the plain text version of the email.

If you'd like to try the example email templates, simply comment out `templatesDir`, `layoutsDir`, and `partialsDir` in your configuration.
