const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const multer = require("multer");

const addCreditCard = (req, res) => {
  try {
    db.credit_cards
      .max("id")
      .then((maxCreditCardId) => {
        const newCreditCardId = maxCreditCardId ? maxCreditCardId + 1 : 1;
        db.customers
          .findOne({ where: { CMND: req.body.CMNDUser } })
          .then((customer) => {
            db.credit_cards
              .create({
                id: newCreditCardId,
                CC_number: req.body.CardNumber,
                Maximum_Limit: 10000.0,
                Expiry_Date: new Date(
                  new Date().setFullYear(new Date().getFullYear() + 4)
                ),
                Credit_Score: 0,
                CVC: req.body.CVCNumber,
                locked: false,
                get_physical_card: false,
                Customer_id: customer.id,
              })
              .then((createdCreditCard) => {
                return res.status(200).json({
                  success: true,

                  message: "Tạo dữ liệu thẻ ngân hàng thành công",
                  createdCreditCard: createdCreditCard,
                });
              })
              .catch((error) => {
                return res.status(500).json({
                  message: "Lỗi khi tạo bảng credit_cards",
                  error: error.message,
                });
              });
          })
          .catch((error) => {
            return res.status(500).json({
              message: "Lỗi khi tìm giá trị CMND khách hàng",
              error: error.message,
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Lỗi khi tìm giá trị lớn nhất của CreditCard_id",
          error: error.message,
        });
      });
  } catch (error) {
    console.error("Lỗi server", error);
    return res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const createSendingMoney = (req, res) => {
  try {
    db.customers
      .findOne({ where: { CMND: req.body.CMNDUser } })
      .then((customer) => {
        db.other_banks
          .findOne({ where: { BINCode: req.body.BINCode } })
          .then((other_banks) => {
            if (!other_banks) {
              return res.status(404).json({
                success: false,
                message: "Ngân hàng không tồn tại.",
              });
            }

            db.accounts
              .findOne({
                where: {
                  Account_id: req.body.Account_id,
                },
              })
              .then((dataAccount) => {
                const currentBalance = parseFloat(dataAccount.Account_Balance);
                const amountToAdd = parseFloat(req.body.Account_Balance);

                if (isNaN(currentBalance) || isNaN(amountToAdd)) {
                  return res.status(400).json({
                    success: false,
                    message: "Invalid input for Account_Balance.",
                  });
                }

                const updatedBalance = currentBalance - amountToAdd;

                dataAccount
                  .update({ Account_Balance: updatedBalance.toFixed(2) })
                  .then(() => {
                    db.banking_transactions
                      .max("id")
                      .then((maxBankingTransactionId) => {
                        const newBankingTransactionId = maxBankingTransactionId
                          ? maxBankingTransactionId + 1
                          : 1;

                        db.banking_transactions
                          .create({
                            id: newBankingTransactionId,
                            Transaction_Type: "Chuyển khoản",
                            Description: req.body.Description,
                            Amount: amountToAdd,
                            Payee: req.body.Payee,
                            recipient_account_number:
                              req.body.recipient_account_number,
                            Date: new Date(),
                            Customer_id: customer.id,
                            other_bank_id: other_banks.id,
                          })
                          .then((createdbankingtransactions) => {
                            return res.status(200).json({
                              success: true,
                              message: "Tạo dữ liệu chuyển khoản thành công",
                              createdbankingtransactions:
                                createdbankingtransactions,
                            });
                          })
                          .catch((error) => {
                            return res.status(500).json({
                              success: false,
                              message: "Lỗi khi tạo dữ liệu chuyển khoản",
                              error: error.message,
                            });
                          });
                      })
                      .catch((error) => {
                        return res.status(500).json({
                          message:
                            "Lỗi khi tìm giá trị lớn nhất của banking_transaction_id",
                          error: error.message,
                        });
                      });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      success: false,
                      message: "Lỗi khi cập nhật số dư tài khoản",
                      error: error.message,
                    });
                  });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  message: "Lỗi khi tìm thông tin tài khoản",
                  error: err.message,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              message: "Lỗi khi tìm thông tin ngân hàng",
              error: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Lỗi khi tìm thông tin khách hàng",
          error: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};

const createCreditCardTransaction = (req, res) => {
  try {
    db.customers
      .findOne({ where: { CMND: req.body.CMNDUser } })
      .then((customer) => {
        db.credit_cards
          .findOne({ where: { Customer_id: customer.id } })
          .then((credit_cards) => {
            db.accounts
              .findOne({
                where: {
                  Account_id: req.body.Account_id,
                },
              })
              .then((dataAccount) => {
                const currentBalance = parseFloat(dataAccount.Account_Balance);
                const amountToAdd = parseFloat(req.body.amountToAdd);

                if (isNaN(currentBalance) || isNaN(amountToAdd)) {
                  return res.status(400).json({
                    success: false,
                    message: "Invalid input for Account_Balance.",
                  });
                }

                const updatedBalance = currentBalance - amountToAdd;

                dataAccount
                  .update({ Account_Balance: updatedBalance.toFixed(2) })
                  .then(() => {
                    db.cc_transactions
                      .max("id")
                      .then((maxCcTransactionsId) => {
                        const newCcTransactionsId = maxCcTransactionsId
                          ? maxCcTransactionsId + 1
                          : 1;
                        db.cc_transactions
                          .create({
                            id: newCcTransactionsId,
                            CC_number: credit_cards.CC_number,
                            Transaction_Date: new Date(),
                            Amount: amountToAdd,
                            Merchant_Details: req.body.Merchant_Details,
                          })
                          .then((createdCcTransaction) => {
                            return res.status(200).json({
                              success: true,
                              message: "Tạo dữ liệu giao dịch thẻ thành công",
                              createdCcTransaction: createdCcTransaction,
                            });
                          })
                          .catch((error) => {
                            return res.status(500).json({
                              success: false,
                              message: "Lỗi khi tạo dữ liệu giao dịch thẻ",
                              error: error.message,
                            });
                          });
                      })
                      .catch((error) => {
                        return res.status(500).json({
                          message:
                            "Lỗi khi tìm giá trị lớn nhất của cc_transactions_id",
                          error: error.message,
                        });
                      });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      success: false,
                      message: "Lỗi khi cập nhật số dư tài khoản",
                      error: error.message,
                    });
                  });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  message: "Lỗi khi tìm thông tin tài khoản",
                  error: err.message,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              message: "Lỗi khi tìm thông tin thẻ tín dụng",
              error: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Lỗi khi tìm thông tin khách hàng",
          error: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};

const createBank = (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./models");
      },
      filename: function (req, file, cb) {
        const filename = file.originalname;
        cb(null, filename);
      },
    });

    const fileFilter = function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(new Error("Please upload a valid image file (jpg, jpeg, or png)"));
      } else {
        cb(null, true);
      }
    };

    const upload = multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn kích thước tệp tải lên (5MB)
      },
    }).single("image");

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      // Sau khi xử lý tệp tải lên thành công, lưu thông tin vào cơ sở dữ liệu
      db.other_banks
        .max("id")
        .then((other_banksId) => {
          const newother_banksId = other_banksId ? other_banksId + 1 : 1;

          db.other_banks
            .create({
              id: newother_banksId,
              other_banks_name: req.body.other_banks_name,
              other_banks_longName: req.body.other_banks_longName,
              other_banks_icons: req.file.filename,
              BINCode: req.body.BINCode,
            })
            .then((createdother_banks) => {
              return res.status(200).json({
                success: true,
                message: "Tạo dữ liệu ngân hàng thành công",
                createdother_banks: createdother_banks,
              });
            })
            .catch((error) => {
              return res.status(500).json({
                success: false,
                message: "Lỗi khi tạo dữ liệu ngân hàng",
                error: error.message,
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            success: false,
            message: "Lỗi khi tạo dữ liệu ngân hàng",
            error: error.message,
          });
        });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

const updateMoneySTK = (req, res) => {
  db.accounts
    .findOne({
      where: {
        Account_id: req.body.Account_id,
      },
    })
    .then((dataAccount) => {
      const currentBalance = parseFloat(dataAccount.Account_Balance);
      const amountToAdd = parseFloat(req.body.Account_Balance);

      // Check if the parsed values are valid numbers
      if (isNaN(currentBalance) || isNaN(amountToAdd)) {
        return res.status(400).json({
          success: false,
          message: "Invalid input for Account_Balance.",
        });
      }

      const updatedBalance = currentBalance + amountToAdd;

      dataAccount
        .update({ Account_Balance: updatedBalance.toFixed(2) }) // Limiting to 2 decimal places
        .then((updatedAccount) => {
          db.customers
            .findOne({ where: { CMND: req.body.CMNDUser } })

            .then((customer) => {
              db.banking_transactions
                .max("id")
                .then((maxBankingTransactionId) => {
                  const newBankingTransactionId = maxBankingTransactionId
                    ? maxBankingTransactionId + 1
                    : 1;

                  db.banking_transactions
                    .create({
                      id: newBankingTransactionId,
                      Transaction_Type: "Gửi tiền",
                      Amount: amountToAdd,
                      accept_Recharge: false,
                      Date: new Date(),
                      Customer_id: customer.id,
                    })
                    .then((createdbankingtransactions) => {
                      return res.status(200).json({
                        success: true,
                        message: "Tạo dữ liệu chuyển khoản thành công",
                        createdbankingtransactions: createdbankingtransactions,
                      });
                    })
                    .catch((error) => {
                      return res.status(500).json({
                        success: false,
                        message: "Lỗi khi tạo dữ liệu chuyển khoản",
                        error: error.message,
                      });
                    });
                })
                .catch((error) => {
                  return res.status(500).json({
                    message:
                      "Lỗi khi tìm giá trị lớn nhất của banking_transaction_id",
                    error: error.message,
                  });
                });
            })

            .catch((err) => {
              return res.status(500).json({
                message: "Lỗi khi tìm khách hàng",
                error: err.message,
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            success: false,
            message: "Thêm tiền thất bại.",
            err: error.message,
          });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi server.", err: error.message });
    });
};

const transactionInternal = (req, res) => {
  try {
    db.customers
      .findOne({ where: { CMND: req.body.CMNDUser } })
      .then((customer) => {
        db.account_customers
          .findOne({
            where: {
              Customer_id: customer.id,
            },
          })
          .then((dataAccountCustomer) => {
            db.accounts
              .findOne({
                where: {
                  Account_id: dataAccountCustomer.Account_id,
                },
              })
              .then((dataAccount) => {
                db.accounts
                  .findOne({
                    where: {
                      Account_id: req.body.AccountIdReceipted,
                    },
                  })
                  .then((dataAccountReceipted) => {
                    const currentBalance = parseFloat(
                      dataAccount.Account_Balance
                    );
                    const currentBalanceReceipted = parseFloat(
                      dataAccountReceipted.Account_Balance
                    );
                    const amountToAdd = parseFloat(req.body.amountToAdd);
                    if (isNaN(currentBalance) || isNaN(amountToAdd)) {
                      return res.status(400).json({
                        success: false,
                        message: "Invalid input for Account_Balance.",
                        currentBalance: currentBalance,
                        amountToAdd: amountToAdd,
                      });
                    }
                    const updatedBalance = currentBalance - amountToAdd;
                    const updatedBalanceReceipted =
                      currentBalanceReceipted - amountToAdd;

                    db.accounts
                      .update(
                        { Account_Balance: updatedBalance.toFixed(2) },
                        {
                          where: {
                            Account_id: dataAccount.Account_id,
                          },
                        }
                      )
                      .then((dataAccountUpdated) => {
                        db.accounts
                          .update(
                            {
                              Account_Balance:
                                updatedBalanceReceipted.toFixed(2),
                            },
                            {
                              where: {
                                Account_id: dataAccountReceipted.Account_id,
                              },
                            }
                          )
                          .then((dataAccountReceiptedUpdated) => {
                            db.banking_transactions
                              .max("id")
                              .then((maxBankingTransactionId) => {
                                const newBankingTransactionId =
                                  maxBankingTransactionId
                                    ? maxBankingTransactionId + 1
                                    : 1;

                                db.banking_transactions
                                  .create({
                                    id: newBankingTransactionId,
                                    Transaction_Type: "Chuyển khoản",
                                    Description: req.body.Description,
                                    Amount: amountToAdd,
                                    Date: new Date(),
                                    Customer_id: customer.id,
                                    recipient_accounts_id:
                                      dataAccountReceipted.Account_id,
                                  })
                                  .then((createdbankingtransactions) => {
                                    return res.status(200).json({
                                      success: true,
                                      message:
                                        "Tạo dữ liệu chuyển khoản thành công",
                                      createdbankingtransactions:
                                        createdbankingtransactions,
                                      dataAccountReceiptedUpdated:
                                        dataAccountReceiptedUpdated,
                                      AccountIdReceipted: dataAccountUpdated,
                                    });
                                  })
                                  .catch((error) => {
                                    db.banking_transactions
                                      .destroy({
                                        where: {
                                          id: newBankingTransactionId,
                                        },
                                      })
                                      .then((accountsDestroyed) => {
                                        db.accounts
                                          .update(
                                            {
                                              Account_Balance: currentBalance,
                                            },
                                            {
                                              where: {
                                                Account_id:
                                                  dataAccount.Account_id,
                                              },
                                            }
                                          )
                                          .then((errBackUpData) => {
                                            db.accounts
                                              .update(
                                                {
                                                  Account_Balance:
                                                    currentBalanceReceipted,
                                                },
                                                {
                                                  where: {
                                                    Account_id:
                                                      dataAccountReceipted.Account_id,
                                                  },
                                                }
                                              )
                                              .then((errUpdatedAccount) => {
                                                return res.status(500).json({
                                                  success: false,
                                                  message:
                                                    "Lỗi khi tạo dữ liệu chuyển khoản",
                                                  error: error.message,
                                                });
                                              });
                                          });
                                      });
                                  });
                              })

                              .catch((error) => {
                                return res.status(500).json({
                                  message:
                                    "Lỗi khi tìm giá trị lớn nhất của banking_transaction_id",
                                  error: error.message,
                                });
                              });
                          })
                          .catch((err) => {
                            db.accounts
                              .update(
                                {
                                  Account_Balance: currentBalance,
                                },
                                {
                                  where: {
                                    Account_id: dataAccountReceipted.Account_id,
                                  },
                                }
                              )
                              .then((errUpdated) => {
                                return res.status(500).json({
                                  success: false,
                                  message:
                                    "Lỗi khi update dữ liệu tiền mặt của người gửi",
                                  error: err.message,
                                });
                              });
                          });
                      })
                      .catch((err) => {
                        return res.status(500).json({
                          success: false,
                          message:
                            "Lỗi khi update dữ liệu tiền mặt của người gửi",
                          error: err.message,
                        });
                      });
                  });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  message: "Lỗi khi tìm thông tin tài khoản",
                  error: err.message,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              message: "Lỗi khi tìm thông tin tài khoản",
              error: err.message,
            });
          });
      })

      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Lỗi khi tìm thông tin khách hàng",
          error: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};

const otherTransaction = (req, res) => {
  try {
    db.customers
      .findOne({ where: { CMND: req.body.CMNDUser } })
      .then((customer) => {
        db.account_customers
          .findOne({
            where: {
              Customer_id: customer.id,
            },
          })
          .then((dataAccountCustomer) => {
            db.accounts
              .findOne({
                where: {
                  Account_id: dataAccountCustomer.Account_id,
                },
              })
              .then((dataAccount) => {
                db.banking_transactions
                  .max("id")
                  .then((maxBankingTransactionId) => {
                    const newBankingTransactionId = maxBankingTransactionId
                      ? maxBankingTransactionId + 1
                      : 1;
                    const currentBalance = parseFloat(
                      dataAccount.Account_Balance
                    );
                    const amountToAdd = parseFloat(req.body.amountToAdd);
                    db.accounts
                      .update(
                        {
                          Account_Balance: currentBalance - amountToAdd,
                        },
                        {
                          where: {
                            Account_id: dataAccount.Account_id,
                          },
                        }
                      )
                      .then((updatedAccount) => {
                        db.banking_transactions
                          .create({
                            id: newBankingTransactionId,
                            Transaction_Type: "Dịch vụ",
                            Description: req.body.Description,
                            Amount: amountToAdd,
                            Date: new Date(),
                            Customer_id: customer.id,
                          })
                          .then((createdbankingtransactions) => {
                            return res.status(200).json({
                              success: true,
                              message: "Tạo dữ liệu dịch vụ thành công",
                              createdbankingtransactions:
                                createdbankingtransactions,
                              updatedAccount: updatedAccount,
                            });
                          })
                          .catch((err) => {
                            return res.status(500).json({
                              success: false,
                              message:
                                "Lỗi khi tìm tạo thông tin cho bảng banking_transactions",
                              error: err.message,
                            });
                          });
                      });
                  })
                  .catch((err) => {
                    return res.status(500).json({
                      success: false,
                      message:
                        "Lỗi khi tìm thông tin max id của bảng banking_transactions",
                      error: err.message,
                    });
                  });
              })
              .catch((err) => {
                return res.status(500).json({
                  success: false,
                  message: "Lỗi khi tìm thông tin tài khoản",
                  error: err.message,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              message: "Lỗi khi tìm thông tin tài khoản",
              error: err.message,
            });
          });
      })

      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Lỗi khi tìm thông tin khách hàng",
          error: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: err.message,
    });
  }
};
module.exports = {
  addCreditCard,
  createSendingMoney,
  createBank,
  createCreditCardTransaction,
  updateMoneySTK,
  transactionInternal,
  otherTransaction,
};
