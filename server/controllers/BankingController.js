const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

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

const createSendingMoney = (req,res) => {
  
}

module.exports = {
  addCreditCard,
};
