const nodemailer = require("nodemailer");
var sendinBlue = require("nodemailer-sendinblue-transport");
const config = require("config");

// create reusable transporter object using the default SMTP transport

const options = { apiKey: "mHVrhyvNGQTEZR8w" };
const devTransporter3 = nodemailer.createTransport(sendinBlue(options));

const devTransporter = nodemailer.createTransport({
  host: config.get("SMTP_HOST"),
  port: config.get("SMTP_PORT"),
  auth: {
    user: config.get("SMTP_USER"),
    pass: config.get("SMTP_PASS"),
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const devTransporter4 = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: "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",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const devTransporter2 = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bd5ff30e34d9ce",
    pass: "0758f54af2b30f",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const ProdTransporter = nodemailer.createTransport({
  host: "mail.softclo.com",
  port: 25,
  auth: {
    user: "tester@softclo.com",
    pass: "Tester@123",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = { devTransporter, ProdTransporter };
