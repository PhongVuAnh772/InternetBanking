const db = require("../models/index");

const getTransactionCK = (req, res) => {
  db.customers
    .findOne({
      where: {
        CMND: req.body.CMNDUser,
      },
    })
    .then((dbCustomer) => {
      if (dbCustomer) {
        db.banking_transactions
          .findOne({ where: { Customer_id: dbCustomer.id } })
          .then((dbBankTransaction) => {
            return res.status(200).json({
              success: true,
              message: "Lấy thông tin lịch sử giao dịch thành công",
              data: dbCustomer,
              transaction: dbBankTransaction,
            });
          })
          .catch((err) => {
            return res.status(200).json({
              success: false,
              message: "Có lỗi khi lấy dữ liệu lịch sử giao dịch",
              error: err.message,
            });
          });
      } else {
        return res.status(200).json({
          success: false,
          message: "Lấy thông tin lịch sử giao dịch thất bại",
        });
      }
    })
    .catch((err) => {
      return res.status(200).json({
        success: false,
        message: "Có lỗi khi lấy dữ liệu người dùng qua CMND",
        error: err.message,
      });
    });
};

const getTransactionCredit = (req, res) => {
  db.customers
    .findOne({
      where: {
        CMND: req.body.CMNDUser,
      },
    })
    .then((dbCustomer) => {
      if (dbCustomer) {
        db.credit_cards
          .findOne({ where: { Customer_id: dbCustomer.id } })
          .then((dbCreditCard) => {
            db.cc_transactions
              .findOne({ where: { CC_number: dbCreditCard.CC_number } })
              .then((dbCCTransaction) => {
                return res.status(200).json({
                  success: true,
                  message: "Lấy thông tin lịch sử giao dịch thẻ thành công",
                  data: dbCustomer,
                  dbCCTransaction: dbCCTransaction,
                  dbCreditCard: dbCreditCard,
                });
              })
              .catch((err) => {
                return res.status(200).json({
                  success: false,
                  message: "Có lỗi khi lấy dữ liệu lịch sử giao dịch thẻ",
                  error: err.message,
                });
              })
              .catch((err) => {
                return res.status(200).json({
                  success: false,
                  message: "Có lỗi khi lấy dữ liệu lịch sử giao dịch",
                  error: err.message,
                });
              });
          })
          .catch((err) => {
            return res.status(200).json({
              success: false,
              message: "Có lỗi khi lấy dữ liệu thẻ khách hàng",
              error: err.message,
            });
          });
      } else {
        return res.status(200).json({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
    })
    .catch((err) => {
      return res.status(200).json({
        success: false,
        message: "Có lỗi khi lấy dữ liệu người dùng qua CMND",
        error: err.message,
      });
    });
};

module.exports = {
  getTransactionCK,
  getTransactionCredit,
};
