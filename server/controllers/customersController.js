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

const createINickUser = (req, res) => {
  db.accounts
    .findOne({
      where: {
        Account_id: req.body.Account_id, // Invert the value of "locked" to find the opposite status
      },
    })
    .then((dataAccount) => {
      dataAccount
        .update({ iNick: req.body.iNick })
        .then((updatedInick) => {
          return res.json({
            success: true,
            message: "Đổi thuộc tính lấy tên định danh thành công.",
            updatedInick: updatedInick,
          });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ success: false, message: "Failed to update Inick." });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Failed to find Inick." });
    });
};


module.exports = {
  getData,
  getOTPAccount,
  createINickUser
};
