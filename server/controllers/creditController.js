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
          where: { CC_number: req.body.CC_number },
        })
        .then((databaseCreditCard) => {
          db.account_customers
            .findOne({
              where: { Customer_id: databaseCreditCard.Customer_id },
            })
            .then((dataAccountCustomer) => {
              db.accounts
                .findOne({
                  where: { Account_id: dataAccountCustomer.Account_id },
                })
                .then((dataAccount) => {
                  db.credit_cards
                    .findOne({
                      where: { CC_number: req.body.recipient_credit },
                    })
                    .then((creditRecipient) => {
                      db.customers
                        .findOne({
                          where: { id: creditRecipient.Customer_id },
                        })
                        .then((customersRecipientData) => {
                          db.account_customers
                            .findOne({
                              where: { Customer_id: customersRecipientData.id },
                            })
                            .then((accountCustomersRecipientData) => {
                              db.accounts
                                .findOne({
                                  where: {
                                    Account_id:
                                      accountCustomersRecipientData.Account_id,
                                  },
                                })
                                .then((accountsRecipientData) => {
                                  const oldBalance =
                                    accountsRecipientData.Account_Balance;
                                  db.accounts.update(
                                    {
                                      Account_Balance: parseFloat(
                                        req.body.recipient_credit
                                      ),
                                    },
                                    {
                                      where: {
                                        Account_id:
                                          accountsRecipientData.Account_id,
                                      },
                                    }
                                      .then((updatedDataBalanceAccount) => {
                                        const currentBalance = parseFloat(
                                          databaseCreditCard.Account_Balance
                                        );
                                        const amountToAdd = parseFloat(
                                          req.body.moneySent
                                        );
                                        db.cc_transactions
                                          .create({
                                            id: maxCCTransactionsIdRes,
                                            CC_number:
                                              databaseCreditCard.CC_number,
                                            Transaction_Date: Date.now(),
                                            Amount: amountToAdd,
                                            MerchantDetails:
                                              req.body.merchantDetails,
                                            recipient_accounts_id:
                                              accountsRecipientData.id,
                                          })

                                          .then((ccTransactionCreated) => {
                                            db.accounts
                                              .update(
                                                {
                                                  Account_Balance:
                                                    currentBalance -
                                                    amountToAdd,
                                                },
                                                {
                                                  where: {
                                                    Account_id: dataAccount.id,
                                                  },
                                                }
                                              )
                                              .then((AccountBalanceUpdated) => {
                                                return res.status(200).json({
                                                  success: true,
                                                  message:
                                                    "Thành công trong việc update mọi dữ liệu",
                                                  ccTransactionCreated:
                                                    ccTransactionCreated,
                                                  AccountBalanceUpdated:
                                                    AccountBalanceUpdated,
                                                  updatedDataReceiptBalanceAccount:
                                                    updatedDataBalanceAccount,
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
                                                    db.accounts
                                                      .update(
                                                        {
                                                          Account_balance:
                                                            oldBalance,
                                                        }, // Sử dụng giá trị cũ
                                                        {
                                                          where: {
                                                            Customer_id:
                                                              customersRecipientData.id,
                                                          },
                                                        }
                                                      )
                                                      .then((errBackUpData) => {
                                                        return res
                                                          .status(200)
                                                          .json({
                                                            success: false,
                                                            message:
                                                              "Lỗi khi update dữ liệu Account_Balance và đã xóa bảng thành công",
                                                            err: err.message,
                                                          });
                                                      });
                                                  });
                                              });
                                          })
                                          .catch((err) => {
                                            db.accounts
                                              .update(
                                                { Account_balance: oldBalance }, // Sử dụng giá trị cũ
                                                {
                                                  where: {
                                                    Customer_id:
                                                      customersRecipientData.id,
                                                  },
                                                }
                                              )
                                              .then((errBackUpData) => {
                                                return res.status(200).json({
                                                  success: false,
                                                  message:
                                                    "Lỗi khi tạo thanh toán cho bảng cc_transactions",
                                                  err: err.message,
                                                });
                                              });
                                          });
                                      })
                                      .catch((err) => {
                                        db.accounts
                                          .update(
                                            { Account_balance: oldBalance }, // Sử dụng giá trị cũ
                                            {
                                              where: {
                                                Customer_id:
                                                  customersRecipientData.id,
                                              },
                                            }
                                          )
                                          .then((errBackUpData) => {
                                            return res.status(200).json({
                                              success: false,
                                              message:
                                                "Lỗi khi update dữ liệu account_balance người nhận",
                                              err: err.message,
                                            });
                                          });
                                      })
                                  );
                                });
                            })
                            .catch((err) => {
                              return res.status(200).json({
                                success: false,
                                message:
                                  "Lỗi khi tìm nguời được chuyển tiền trong bảng customers",
                                err: err.message,
                              });
                            });
                        })
                        .catch((err) => {
                          return res.status(200).json({
                            success: false,
                            message:
                              "Lỗi khi tìm nguời được chuyển tiền trong bảng customers",
                            err: err.message,
                          });
                        });
                    })
                    .catch((err) => {
                      return res.status(200).json({
                        success: false,
                        message:
                          "Lỗi khi tìm nguời được chuyển tiền trong credit_card",
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
      where: { CC_number: req.body.CC_number },
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
              databaseCreditCard: databaseCreditCard,
            });
          })
          .catch((error) => {
            // Xử lý lỗi
            console.log(error);
            res.status(200).send({
              success: false,
              error: "Lỗi khi tìm dữ liệu bảng customer",
            });
          });
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
  checkCreditExist,
};
