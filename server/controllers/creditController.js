const db = require("../models/index");

const transactionCredit = (req, res) => {
  db.cc_transactions
    .max("id")
    .then((maxCCTransactionsId) => {
      const maxCCTransactionsIdRes = maxCCTransactionsId
        ? maxCCTransactionsId + 1
        : 1;
      db.credit_cards
        .findOne({
          CC_number: req.body.CC_number,
        })
        .then((databaseCreditCard) => {
          db.account_customers
            .findOne({
              Customer_id: databaseCreditCard.Customer_id,
            })
            .then((dataAccountCustomer) => {
              db.accounts
                .findOne({
                  Account_id: dataAccountCustomer.Account_id,
                })
                .then((dataAccount) => {
                  const currentBalance = parseFloat(
                    databaseCreditCard.Account_Balance
                  );
                  const amountToAdd = parseFloat(req.body.moneySent);
                  db.cc_transactions
                    .create({
                      id: maxCCTransactionsIdRes,
                      CC_number: databaseCreditCard.CC_number,
                      Transaction_Date: Date.now(),
                      Amount: amountToAdd,
                      MerchantDetails: req.body.merchantDetails,
                    })

                    .then((ccTransactionCreated) => {
                      db.accounts
                        .update({
                          Account_Balance: currentBalance + amountToAdd,
                        })
                        .then((AccountBalanceUpdated) => {
                          return res.status(200).json({
                            success: true,
                            message: "Thành công trong việc update mọi dữ liệu",
                            ccTransactionCreated: ccTransactionCreated,
                            AccountBalanceUpdated: AccountBalanceUpdated,
                          });
                        })
                        .catch((err) => {
                          db.cc_transactions
                            .destroy({
                              where: {
                                id: maxCCTransactionsIdRes,
                              },
                            })
                            .then((accountsDestroyed) => {
                              return res.status(200).json({
                                success: false,
                                message:
                                  "Lỗi khi update dữ liệu Account_Balance và đã xóa bảng thành công",
                                err: err.message,
                              });
                            });
                        });
                    })
                    .catch((err) => {
                      return res.status(200).json({
                        success: false,
                        message:
                          "Lỗi khi tạo thanh toán cho bảng cc_transactions",
                        err: err.message,
                      });
                    });
                })
                .catch((err) => {
                  return res.status(200).json({
                    success: false,
                    message: "Lỗi khi tìm người dùng trong bảng Account",
                  });
                });
            })
            .catch((err) => {
              return res.status(200).json({
                success: false,
                message: "Lỗi khi tìm người dùng trong bảng Acccount_Customers",
                err: err.message,
              });
            });
        })
        .catch((err) => {
          return res.status(200).json({
            success: false,
            message: "Lỗi khi tìm bảng credit_card",
            err: err.message,
          });
        });
    })
    .catch((err) => {
      return res.status(200).json({
        success: false,
        message: "Lỗi khi tìm thấy giá trị max của bảng banking_transaction",
        err: err.message,
      });
    });
};

const checkCreditExist = (req, res) => {
  db.credit_cards
    .findOne({
      where: { CC_number: req.body.CC_number }
    })
    .then((databaseCreditCard) => {
      if (databaseCreditCard) {
        
            db.customers
              .findOne({
                where: {
                  id: databaseCreditCard.Customer_id,
                },
              })
              .then((dbCustomers) => {
                return res.status(200).json({
                  success: true,

                  message: "Tài khoản đã tìm thấy",
                  dbCustomers: dbCustomers,
                  databaseCreditCard: databaseCreditCard
                });
              })
              .catch((error) => {
                // Xử lý lỗi
                console.log(error);
                res.status(200).send({
                  success: false,
                  error: "Lỗi khi tìm dữ liệu bảng customer",
                });
              })
      } else {
        return res.status(200).json({
          success: false,
          message: "Không tìm thấy người dùng",
        });
      }
    })
    .catch((error) => {
      return res.status(200).json({
        success: false,
        message: "Lỗi khi tìm thấy giá trị trong bảng credit_cards",
        error: error.message,
      });
    });
};


module.exports = {
  transactionCredit,
  checkCreditExist
};
