const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (config) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "olanrewajuolamide100@gmail.com",
        pass: "rfterq4wr6yuh",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: "olanrewajuolamide10@gmail.com",
      ...config,
    });

    return `Preview URL: %s', ${nodemailer.getTestMessageUrl(info)}`;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendMail };