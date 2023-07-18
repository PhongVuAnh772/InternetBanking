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
      return res.status(200).json({
        success: false,
        message: "Lỗi server",
      });
    });
};

const signUp = (req, res) => {
  bcryptjs.hash(req.body.password, 16, (err, passwordHash) => {
    if (err) {
      return res.status(200).json({
        message: "Không mã hóa được mật khẩu",
      });
    } else if (passwordHash) {
      db.customers
        .max("id") // Lấy giá trị lớn nhất của CustomerId
        .then((maxCustomerId) => {
          const newCustomerId = maxCustomerId ? maxCustomerId + 1 : 1;

          db.account_customers
            .create({
              Account_id: req.body.Account_id,
              Customer_id: newCustomerId,
            })
            .then((account_customers) => {
              db.accounts
                .create({
                  Account_id: req.body.Account_id,
                  Account_Balance: 0,
                  Date_Opened: new Date(),
                  password: passwordHash,
                  Account_Type: "checking",
                })
                .then((createdAccount) => {
                  db.customers
                    .create({
                      id: newCustomerId,
                      Full_Name: req.body.fullName,
                      Date_of_Birth: req.body.dateOfBirth,
                      Country: req.body.region,
                      Email: req.body.email,
                      CMND: req.body.CMNDUser,
                      Sex: req.body.gender,
                    })
                    .then((createCustomer) => {
                      return res.status(200).json({
                        success: true,
                        message: "Tạo tài khoản thành công",
                        accountCustomer: account_customers,
                        createdAccount: createdAccount,
                        createCustomer: createCustomer,
                      });
                    })
                    .catch((error) => {
                      return res.status(500).json({
                        message: "Lỗi khi tạo dữ liệu cho bảng Customers",
                        error: error.message,
                      });
                    });
                })
                .catch((error) => {
                  return res.status(500).json({
                    message: "Lỗi khi tạo dữ liệu cho bảng accounts",
                    error: error.message,
                  });
                });
            })
            .catch((error) => {
              return res.status(500).json({
                message: "Lỗi khi tạo tài khoản",
                error: error.message,
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            message: "Lỗi khi lấy giá trị lớn nhất của CustomerId",
            error: error.message,
          });
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
