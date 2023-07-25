const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const multer = require("multer");

const addCreditCard = (req, res) => {
  try {
    db.credit_cards
      .max("id") // Lấy giá trị lớn nhất của CreditCard_id
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
    db.customers.findOne({ where: { CMND: req.body.CMNDUser } })
      .then((customer) => {
        db.other_banks.findOne({ where: { BINCode: req.body.BINCode } })
          .then((other_banks) => {
            if (!other_banks) {
              return res.status(404).json({
                success: false,
                message: "Ngân hàng không tồn tại.",
              });
            }

            db.banking_transactions.max("id")
              .then((maxBankingTransactionId) => {
                const newBankingTransactionId = maxBankingTransactionId
                  ? maxBankingTransactionId + 1
                  : 1;

                db.banking_transactions.create({
                  id: newBankingTransactionId,
                  Transaction_Type: req.body.Transaction_Type,
                  Description: req.body.Description,
                  Amount: req.body.Amount,
                  Payee: req.body.Payee,
                  recipient_account_number: req.body.recipient_account_number,
                  Date: new Date(),
                  Customer_id: customer.id,
                  other_bank_id: other_banks.id,
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
                  message: "Lỗi khi tìm giá trị lớn nhất của banking_transaction_id",
                  error: error.message,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Lỗi khi tìm ngân hàng",
              error: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Lỗi khi tìm khách hàng",
          error: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi server",
      error: err.message,
    });
  }
};

const createCreditCardTransaction = (req, res) => {
  try {
    db.customers.findOne({ where: { CMND: req.body.CMNDUser } })
      .then((customer) => {
        db.credit_cards.findOne({ where: { Customer_id: customer.id } })
          .then((credit_cards) => {

            db.cc_transactions.max("id")
              .then((maxcc_transactionsId) => {
                const newcc_transactionsId = maxcc_transactionsId
                  ? maxcc_transactionsId + 1
                  : 1;
                db.cc_transactions.create({
                  id: newcc_transactionsId,
                  CC_number: credit_cards.CC_number,
                  Transaction_Date: new Date(),
                  Amount: req.body.Amount,
                  Merchant_Details: req.body.Merchant_Details,
                  
                })
                .then((createdcc_transactions) => {
                  return res.status(200).json({
                    success: true,
                    message: "Tạo dữ liệu giao dịch thẻ thành công",
                    createdcc_transactions: createdcc_transactions,
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
                  message: "Lỗi khi tìm giá trị lớn nhất của cc_transactions_id",
                  error: error.message,
                });
              });
          })
          .catch((err) => {
            return res.status(500).json({
              message: "Lỗi khi tìm ngân hàng",
              error: err.message,
            });
          });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Lỗi khi tìm khách hàng",
          error: err.message,
        });
      });
  } catch (err) {
    return res.status(500).json({
      message: "Lỗi server",
      error: err.message,
    });
  }
};

const createBank = (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './models')
      },
      filename: function (req, file, cb) {
        const filename = file.originalname;
        cb(null, filename)
      }
    })

    const fileFilter = function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(new Error('Please upload a valid image file (jpg, jpeg, or png)'))
      } else {
        cb(null, true)
      }
    }

    const upload = multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn kích thước tệp tải lên (5MB)
      }
    }).single('image')

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      // Sau khi xử lý tệp tải lên thành công, lưu thông tin vào cơ sở dữ liệu
      db.other_banks.max("id")
        .then((other_banksId) => {
          const newother_banksId = other_banksId ? other_banksId + 1 : 1;

          db.other_banks.create({
            id: newother_banksId,
            other_banks_name: req.body.other_banks_name,
            other_banks_longName: req.body.other_banks_longName,
            other_banks_icons: req.file.filename, 
            BINCode: req.body.BINCode
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

module.exports = {
  addCreditCard,
  createSendingMoney,
  createBank,
  createCreditCardTransaction
};
