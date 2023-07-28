const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS_GMAIL,
  },
});

const sendMail = (req, res) => {
  const { emailReceived, subject } = req.body;

  if (!emailReceived || !subject) {
    return res.status(400).json({
      message: "Missing required fields (emailReceived and subject).",
    });
  }

  const mailOptions = {
    from: "vuanhphong1701@gmail.com",
    to: emailReceived,
    subject: subject,
    text: "1234",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi khi gửi gmail",
        error: error.message,
      });
    } else {
      return res.status(200).json({
        message: "OK",
        info: info,
      });
    }
  });
};

module.exports = {
  sendMail,
};
