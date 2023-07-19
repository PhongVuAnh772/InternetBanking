const db = require("../models/index");
const getData = async (req, res) => {
  db.customers
    .findOne({
      where: {
        Email: req.body.Email,
        CMND: req.body.CMNDValue,
      },
    })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(200).json({
          success: false,

          message: "Tài khoản đã tồn tại trong hệ thống",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "OK",
        });
      }
    })
    .catch((error) => {
      // Xử lý lỗi
      console.log(error);
      res.status(200).send({ success: false, error: "Server hiện tại bảo trì, vui lòng thử lại sau ít phút" });
    });
};

const getOTPAccount = async (req, res) => {
  db.accounts
    .findOne({
      where: {
        PINCode: req.body.PINCode,
      },
    })
    .then((dbUser) => {
      if (dbUser) {
        return res.status(200).json({
          success: true,

          message: "OTP đúng",
          data: dbUser
        });
      } else {
        return res.status(200).json({
          success: false,
          message: "OTP không khớp, hãy thử lại",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(200).send({ success: false, error: "Lỗi server" });
    });
};



module.exports = {
  getData,
  getOTPAccount
};
