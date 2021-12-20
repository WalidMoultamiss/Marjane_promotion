
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports = mailer = async (html,email) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL, // generated ethereal user
        pass: process.env.NODEMAILER_PASS// generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Marjane Administer ',
    to: email, // list of receivers
    subject: "create account", // Subject line
    text: "Complete your account creation", // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}