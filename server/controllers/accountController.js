const db = require("../models/index");


const checkSTKBank = async (req, res) => {
  db.accounts
    .findOne({
      where: {
        Account_id: req.body.Account_id,
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

module.exports = {
  checkSTKBank,
};
