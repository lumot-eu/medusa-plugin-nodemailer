# medusa-plugin-nodemailer-hbs

A notification service based on Nodemailer & Handlebars templating engine.

## Installation

To install, run the following command in your terminal:

```bash
npm install @lumot-eu/medusa-plugin-nodemailer-hbs
```

Add the following values to your `medusa-config.js` file:

```javascript
const plugins = [
  // ...
  {
    resolve: "@lumot-eu/medusa-plugin-nodemailer-hbs",
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
      templateDir: "email-templates",

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
    },
  },
];
```

### E-mail templates

Templates for each event should be placed in a sub-directory matching the name specified in the templateMap: eg. `{templateDir}/order.placed`. The sub-directory must contain two files: `html.hbs` for the HTML version and `txt.hbs` for the plain text version of the email.
