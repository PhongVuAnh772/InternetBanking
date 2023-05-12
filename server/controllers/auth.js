const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const signIn = (req, res) => {
  db.Accounts.findOne({
    where: {
      Account_id: req.body.Account_id,
    },
  })
    .then((account) => {
      if (!account) {
        return res.status(200).json({
          success: success,
          message: "Tài khoản không tồn tại",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          account.password,
          (err, compareRes) => {
            if (err) {
              return res.status(200).json({
                suscess: suscess,
                message: "Có lỗi trong khi kiểm tra mật khẩu, vui lòng thử lại",
              });
            } else if (compareRes) {
              const token = jwt.sign(
                { Account_id: req.body.Account_id },
                "secret",
                { expiresIn: "1h" }
              );
              return res
                .status(200)
                .json({ token: token, message: "Đăng nhập thành công" });
            } else {
              return res
                .status(200)
                .json({ message: "Xác thực không thành công" });
            }
          }
        );
      }
    })
    .catch(function (err) {
      console.error(err);
    });
};

const signUp = (req, res) => {
  db.Accounts.findOne({
    where: {
      email: req.body.Account_id,
    },
  }).then((dbUser) => {
    if (dbUser) {
      return res.status(200).json({
        message: "Tài khoản đã tồn tại trong hệ thống",
      });
    } else {
      const hash = crypto.createHash("sha256").update(email).digest("hex");

      bcryptjs.hash(req.body.password, 12, (err, passwordHash) => {
        if (err) {
          return res.status(200).json({
            message: "Không mã hóa được mật khẩu",
          });
        } else if (passwordHash) {
          db.Account_customers.create({
            Customers_id: req.body.Account_id,
          });
        }
      });
    }
  });
};
module.exports = {
  signUp,
  signIn,
};
