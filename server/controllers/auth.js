const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const signIn = (req, res) => {
  db.accounts
    .findOne({
      where: {
        Account_id: req.body.name,
      },
    })
    .then((account) => {
      if (!account) {
        return res.status(200).json({
          success: false,
          message: "Tài khoản không tồn tại",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          account.password,
          (err, compareRes) => {
            if (err) {
              return res.status(200).json({
                suscess: false,
                message: "Có lỗi trong khi kiểm tra mật khẩu, vui lòng thử lại",
              });
            } else if (compareRes) {
              const token = jwt.sign(
                { Account_id: req.body.Account_id },
                "secret",
                { expiresIn: "1h" }
              );
              return res.status(200).json({
                success: true,
                token: token,
                message: "Đăng nhập thành công",
              });
            } else {
              return res
                .status(200)
                .json({ success: false, message: "Xác thực không thành công" });
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
  db.accounts
    .findOne({
      where: {
        Account_id: req.body.name,
      },
    })
    .then((dbUser) => {
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
            db.accounts.create({
              Customers_id: req.body.Account_id,
            });
          }
        });
      }
    });
};

const isAuth = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Không xác thực thành công" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token: " + token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    return res
      .status(200)
      .json({ message: err.message || "could not decode the token" });
  }
  if (!decodedToken) {
    return res.status(200).json({ message: "unauthorized" });
  } else {
    return res.status(200).json({ message: "here is your resource" });
  }
};

module.exports = {
  signUp,
  signIn,
  isAuth,
};
