const db = require("../models/index");

const changeLocked = (req, res) => {
  db.credit_cards
    .findOne({
      where: {
        CC_number: req.body.CC_number,
      },
    })
    .then((dataAccountCustomer) => {
      dataAccountCustomer
        .update({ locked: !dataAccountCustomer.locked })
        .then((updatedCreditCard) => {
          res.json({
            success: true,
            message: "Đổi thuộc tính khóa thẻ thành công.",
            creditCard: updatedCreditCard,
          });
        })
        .catch((error) => {
          res
            .status(500)
            .json({
              success: false,
              message: "Đổi thuộc tính khóa thẻ thất bại",
            });
        });
    })
    .catch((error) => {
      console.error("Error finding credit card:", error);
      res
        .status(500)
        .json({ success: false, message: "Đổi thuộc tính khóa thẻ thất bại" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: "Lấy dữ liệu thất bại" });
    });
};

const changePhysicalCards = (req, res) => {
  db.credit_cards
    .findOne({
      where: {
        CC_number: req.body.CC_number, // Invert the value of "locked" to find the opposite status
      },
    })
    .then((dataAccountCustomer) => {
      dataAccountCustomer
        .update({ get_physical_card: !dataAccountCustomer.get_physical_card })
        .then((updatedCreditCard) => {
          return res.json({
            success: true,
            message: "Đổi thuộc tính lấy thẻ cứng thành công.",
            creditCard: updatedCreditCard,
          });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ success: false, message: "Failed to update credit card." });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Failed to find credit card." });
    });
};

const changeDataPINCode = (req, res) => {

  db.accounts
    .findOne({
      where: {
        Account_id: req.body.Account_id, 
      },
    })
    .then((dataAccountCustomer) => {
      dataAccountCustomer
        .update({ PINCode: req.body.PINCode })
        .then((updatedPIN) => {
          return res.json({
            success: true,
            message: "Đổi mã PIN thành công.",
            creditCard: updatedPIN,
          });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ success: false, message: "Đổi mã PIN thất bại" });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Lấy thông tin thất bại." });
    });
};

module.exports = {
  changeLocked,
  changePhysicalCards,
  changeDataPINCode
};
