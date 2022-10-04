const config = require("../config/config");
const logger = require("../config/logger");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(config.email.sendgridApiKey);

exports.sendEmail = async ({
  to,
  subject,
  text,
  html,
  templateId,
  templateData,
}) => {
  const msg = {
    to: to, // Change to your recipient
    from: config.email.verifiedSender, // Change to your verified sender
    subject: subject,
    text: text,
    html: html,
    template_id: templateId,
    dynamic_template_data: templateData,
  };

  sgMail
    .send(msg)
    .then(() => {
      logger.info(`Email sent with subject "${subject}" to ${to}`);
    })
    .catch((error) => {
      console.error(error.response.body);
    });
};

exports.sendForgetPasswordOtpEmail = async ({
  to,
  subject = "Reset Password",
  otp,
}) => {
  const msg = {
    to: to, // Change to your recipient
    from: config.email.verifiedSender, // Change to your verified sender
    subject: subject,
    text: `OTP to reset your password id ${otp}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      logger.info(`Email sent with subject "${subject}" to ${to}`);
    })
    .catch((error) => {
      if (error && error.response) {
        console.error(error.response);
      } else console.error(error);
    });
};

exports.sendRestaurantPasswordEmail = async ({
  to,
  subject = "Welcome to JDT Fan Serve",
  password,
}) => {
  const msg = {
    to: to, // Change to your recipient
    from: config.email.verifiedSender, // Change to your verified sender
    subject: subject,
    text: `Your store dashboard password is ${password}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      logger.info(`Email sent with subject "${subject}" to ${to}`);
    })
    .catch((error) => {
      if (error && error.response) {
        console.error(error.response);
      } else console.error(error);
    });
};

exports.sendStaffPasswordEmail = async ({
  to,
  subject = "Welcome to JDT Fan Serve",
  password,
}) => {
  const msg = {
    to: to, // Change to your recipient
    from: config.email.verifiedSender, // Change to your verified sender
    subject: subject,
    text: `Your staff dashboard password is ${password}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      logger.info(`Email sent with subject "${subject}" to ${to}`);
    })
    .catch((error) => {
      if (error && error.response) {
        console.error(error.response);
      } else console.error(error);
    });
};

exports.sendWelcomeEmail = (email) => {
  const body = {
    to: email, // Change to your recipient
    from: config.email.verifiedSender, // Change to your verified sender
    subject: "Thank you for signing up into fan server",
    text: "welcome to fan serve",
    // template_id: templateId,
    // dynamic_template_data: templateData,
  };
  sendEmail(body);
};
