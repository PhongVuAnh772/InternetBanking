const db = require("../models/index");
const getData = async (req, res) => {
  db.customers
    .findOne({
      where: {
        Email: req.body.Email,
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
      res.status(200).send({ success: false, error: "Internal server error" });
    });
};

module.exports = {
  getData,
};
