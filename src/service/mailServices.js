const nodemailer = require("nodemailer");


const sendingmail = async (email, mailText) => {
  // try {
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: "SSLv3", // tls version
      },
      auth: {
        user: process.env.GMAIL_ACC,
        pass: process.env.GMAIL_PASS,
      },
    });
    let mailOptions;

    mailOptions = {
      from: process.env.GMAIL_ACC,
      to: email,
      subject: "Welcome to Takeneaka",
      text: mailText,
    };
    try {
      return await transporter.sendMail(mailOptions)      
    } catch (error) {
      console.log('error')
      return error
      
    }
};

module.exports = {
  sendingmail,
};
