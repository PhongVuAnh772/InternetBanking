const nodemailer = require("nodemailer");
require("dotenv").config();

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
    html: `<h3>Người dùng yêu cầu gửi tiền : ${req.body.cusName}</h3>
        <p>Bạn nhận được email này vì khách hàng đẵ tạo phiếu gửi tiền vào tài khoản</p>
        <p>Thông tin gửi tiền:<p>
        <div><b>Số tài khoản: ${req.body.contentSTK}</b></div>
        <div><b>Thời gian: ${req.body.time}</b></div>
        <div>Số tiền: ${req.body.moneyDeposit}</div>
        <p>Nếu các thông tin trên chính xác , vui lòng nhấn vào đường link bên dưới để hoàn tất thủ tục xác nhận cho khách hàng</p>
        <div><a href=${req.body.directLink} target="_blank">Click here</a></div>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi khi gửi gmail",
        error: error.message,
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "OK",
        info: info,
        success: true,
      });
    }
  });
};

const sendMailSignedUp = (req, res) => {
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
    html: `<h3>Bạn vừa đăng ký hệ thống ngân hàng</h3>
        <p>Thông tin cá nhân: <p>
        <div><b>Tên tài khoản: ${req.body.contentSTK}</b></div>
        <div><b>Tên đăng nhập: ${req.body.accountID}</b></div>
        <div><b>Mật khẩu: ${req.body.gmail}<div><b>
        <div><b>Số tài khoản: ${req.body.contentSTK}</b></div>
        <div><b>Thời gian tạo tài khoản: ${req.body.time}</b></div>
        <div><b>Số thẻ: ${req.body.creditNumber}</b></div>
        
         
        <div><b>Ngày hết hạn thẻ: ${req.body.dateCredit}</b></div>

        <p>Nếu các thông tin trên chính xác, hãy đăng nhập vào app và trải nghiệm</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi khi gửi gmail",
        error: error.message,
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "OK",
        info: info,
        success: true,
      });
    }
  });
};

const sendMailOTP = (req, res) => {
  const { emailReceived } = req.body;

  if (!emailReceived) {
    return res.status(400).json({
      message: "Missing required fields (emailReceived and subject).",
    });
  }

  const mailOptions = {
    from: "vuanhphong555@gmail.com",
    to: emailReceived,
    subject: 'Mã OTP xác thực',
    text: "1234",
    html: `<h3>Bạn vừa nhận mã xác thực OTP, mã của bạn là : ${req.body.OTPChecking}</h3>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi khi gửi gmail",
        error: error.message,
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "OK",
        info: info,
        success: true,
      });
    }
  });
};

module.exports = {
  sendMail,
  sendMailSignedUp,
  sendMailOTP
};
