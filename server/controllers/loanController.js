const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const addLoans = (req, res) => {
  try {
    db.loan
      .max("id") // Lấy giá trị lớn nhất của LoanCard_id
      .then((maxLoanId) => {
        const newLoanId = maxLoanId ? maxLoanId + 1 : 1;
        db.customers
          .findOne({ where: { CMND: req.body.CMNDUser } })
          .then((customer) => {
            db.loan
              .create({
                id: newLoanId,
                Duration_in_Years: req.body.DurationInYears,
                Maximum_Limit: 10000.0,
                Loan_Start_Date: new Date(),
                Interest_Rate: 7.3,
                Loan_Amount_Taken: req.body.LoanAmountTaken,
                Loan_Amount_Repaid: 0.00,
                Loan_Type: req.body.LoanType,
                Customer_id: customer.id,
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
              message: "Lỗi khi tìm giá trị CMND khách hàng",
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

module.exports = {
    addLoans
}