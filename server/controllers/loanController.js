const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const addLoans = (req, res) => {
  try {
    db.loan
      .max("id")
      .then((maxLoanId) => {
        const newLoanId = maxLoanId ? maxLoanId + 1 : 1;
        db.customers
          .findOne({ where: { CMND: req.body.CMNDUser } })
          .then((customer) => {
            db.account_customers
              .findOne({
                where: {
                  Customer_id: customer.id,
                },
              })
              .then((dataAccountcustomers) => {
                db.accounts
                  .findOne({
                    where: {
                      Account_id: dataAccountcustomers.Account_id,
                    },
                  })
                  .then((dataAccounts) => {
                    const currentBalance = parseFloat(
                      dataAccounts.Account_Balance
                    );
                    const amountToAdd = parseFloat(req.body.Account_Balance);

                    if (isNaN(currentBalance) || isNaN(amountToAdd)) {
                      return res.status(400).json({
                        success: false,
                        message: "Invalid input for Account_Balance.",
                      });
                    }

                    const updatedBalance = currentBalance + amountToAdd;

                    dataAccounts
                      .update({ Account_Balance: updatedBalance.toFixed(2) })
                      .then(() => {
                        db.loan
                          .create({
                            id: newLoanId,
                            Loan_Transaction_Date: new Date(),
                            Loan_Amount_Taken: amountToAdd,
                            Loan_Amount_Repaid: 0.0,
                            Loan_Type: "Ghi nợ",
                            Customer_id: customer.id,
                            Duration_in_Years: 2.0,
                            Interest_Rate: 1.6
                          })
                          .then((createdLoanCard) => {
                            return res.status(200).json({
                              success: true,
                              message: "Tạo dữ liệu ghi nợ thành công",
                              createdLoanCard: createdLoanCard,
                            });
                          })
                          .catch((error) => {
                            return res.status(500).json({
                              message: "Lỗi khi tạo bảng Loan",
                              error: error.message,
                            });
                          });
                      })
                      .catch((error) => {
                        return res.status(500).json({
                          message: "Lỗi khi tìm Account_Balance",
                          error: error.message,
                        });
                      });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      message: "Lỗi khi tìm giá trị account_customers",
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
              message: "Lỗi khi tìm giá trị Account_id",
              error: error.message,
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Lỗi khi tìm giá trị lớn nhất của Loan_id",
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

const loanRepayment = (req, res) => {
  try {
    db.loan
      .max("id")
      .then((maxLoanId) => {
        const newLoanId = maxLoanId ? maxLoanId + 1 : 1;
        db.customers
          .findOne({ where: { CMND: req.body.CMNDUser } })
          .then((customer) => {
            db.account_customers
              .findOne({
                where: {
                  Customer_id: customer.id,
                },
              })
              .then((dataAccountcustomers) => {
                db.accounts
                  .findOne({
                    where: {
                      Account_id: dataAccountcustomers.Account_id,
                    },
                  })
                  .then((dataAccounts) => {
                    const currentBalance = parseFloat(
                      dataAccounts.Account_Balance
                    );
                    const amountToAdd = parseFloat(req.body.Account_Balance);

                    if (isNaN(currentBalance) || isNaN(amountToAdd)) {
                      return res.status(400).json({
                        success: false,
                        message: "Invalid input for Account_Balance.",
                      });
                    }

                    const updatedBalance = currentBalance - amountToAdd;

                    dataAccounts
                      .update({ Account_Balance: updatedBalance.toFixed(2) })
                      .then(() => {
                        db.loan
                          .create({
                            id: newLoanId,
                            Loan_Transaction_Date: new Date(),
                            Loan_Amount_Taken: 0.0,
                            Loan_Amount_Repaid: amountToAdd,
                            Loan_Type: "Trả nợ",
                            Customer_id: customer.id,
                          })
                          .then((createdLoanCard) => {
                            return res.status(200).json({
                              success: true,
                              message: "Tạo dữ liệu trả nợ thành công",
                              createdLoanCard: createdLoanCard,
                            });
                          })
                          .catch((error) => {
                            return res.status(500).json({
                              message: "Lỗi khi tạo bảng Loan",
                              error: error.message,
                            });
                          });
                      })
                      .catch((error) => {
                        return res.status(500).json({
                          message: "Lỗi khi tìm Account_Balance",
                          error: error.message,
                        });
                      });
                  })
                  .catch((error) => {
                    return res.status(500).json({
                      message: "Lỗi khi tìm giá trị account_customers",
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
              message: "Lỗi khi tìm giá trị Account_id",
              error: error.message,
            });
          });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Lỗi khi tìm giá trị lớn nhất của Loan_id",
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

const getLoansByCMND = (req, res) => {
  db.customers
    .findOne({
      where: {
        CMND: req.body.CMNDUser,
      },
      include: [{ model: db.loan, as: "loanData" }],
    })
    .then((customersLoanData) => {
      return res
        .status(200)
        .json({ success: true, message: "Ok", data: customersLoanData });
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ success: false, message: "Có lỗi", error: error.message });
    });
};

module.exports = {
  addLoans,
  loanRepayment,
  getLoansByCMND,
};
