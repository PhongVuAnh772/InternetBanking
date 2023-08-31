const db = require("../models/index");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const signIn = (req, res) => {
  db.account_customers
    .findOne({
      where: {
        Account_id: req.body.name,
      },
      include: [{ model: db.customers, as: "customerData" }],
    })
    .then((dataAccountCustomer) => {
      db.credit_cards
        .findOne({
          where: {
            Customer_id: dataAccountCustomer.Customer_id,
          },
        })
        .then((dataCreditCards) => {
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
                        success: false,
                        message:
                          "Có lỗi trong khi kiểm tra mật khẩu, vui lòng thử lại",
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
                        data: account,
                        credit_cards: dataCreditCards,
                        other: dataAccountCustomer,
                      });
                    } else {
                      return res.status(200).json({
                        success: false,
                        message: "Xác thực không thành công",
                      });
                    }
                  }
                );
              }
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(200).json({
            success: false,
            message: "Lỗi khi lấy dữ liệu credit_Cards",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        success: false,
        message: "Lỗi khi lấy dữ liệu account_customers",
      });
    });
};

const isAuth = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Không xác thực thành công" });
  }
  const token = authHeader.split(" ")[1];
  console.log("token: " + token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "could not decode the token",
    });
  }
  if (!decodedToken) {
    return res.status(500).json({ success: false, message: "unauthorized" });
  } else {
    return res
      .status(200)
      .json({ success: true, message: "here is your resource" });
  }
};
const signUp = (req, res) => {
  bcryptjs.hash(req.body.password, 16, (err, passwordHash) => {
    if (err) {
      return res.status(200).json({
        message: "Không mã hóa được mật khẩu",
      });
    } else if (passwordHash) {
      db.credit_cards
        .max("id") // Lấy giá trị lớn nhất của CreditCard_id
        .then((maxCreditCardId) => {
          const newCreditCardId = maxCreditCardId ? maxCreditCardId + 1 : 1;
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
                      PINCode: req.body.PINCode,
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
                        .then((createCustomers) => {
                          db.credit_cards
                            .create({
                              id: newCreditCardId,
                              CC_number: req.body.CardNumber,
                              Maximum_Limit: 10000.0,
                              Expiry_Date: new Date(
                                new Date().setFullYear(
                                  new Date().getFullYear() + 4
                                )
                              ),
                              Credit_Score: 0,
                              CVC: req.body.CVCNumber,
                              locked: false,
                              get_physical_card: false,
                              Customer_id: createCustomers.id,
                            })
                            .then((createCreditCard) => {
                              sendMailSignedUp()
                                .then((emailSented) => {
                                  return res.status(200).json({
                                    success: true,
                                    message: "Tạo tài khoản thành công",
                                    accountCustomer: account_customers,
                                    createdAccount: createdAccount,
                                    createCustomer: createCustomers,
                                    credit_cards: createCreditCard,
                                    emailSented: emailSented,
                                  });
                                })
                                .catch((err) => {
                                  Promise.all([
                                    db.accounts.destroy({
                                      where: {
                                        Account_id: req.body.Account_id,
                                      },
                                    }),
                                    db.customers.destroy({
                                      where: {
                                        id: newCustomerId,
                                      },
                                    }),
                                    db.account_customers.destroy({
                                      where: {
                                        Account_id: req.body.Account_id,
                                        Customer_id: newCustomerId,
                                      },
                                    }),
                                    db.credit_cards.destroy({
                                      where: {
                                        Customer_id: newCustomerId,
                                      },
                                    }),
                                  ])
                                    .then(() => {
                                      return res.status(500).json({
                                        message:
                                          "Lỗi khi tạo dữ liệu cho gửi email",
                                        error: err.message,
                                      });
                                    })
                                    .catch((deleteError) => {
                                      return res.status(500).json({
                                        message:
                                          "Lỗi khi xóa dữ liệu không hợp lệ",
                                        error: deleteError.message,
                                      });
                                    });
                                  return res.status(200).json({
                                    success: false,
                                  });
                                });
                            })
                            .catch((error) => {
                              Promise.all([
                                db.accounts.destroy({
                                  where: {
                                    Account_id: req.body.Account_id,
                                  },
                                }),
                                db.customers.destroy({
                                  where: {
                                    id: newCustomerId,
                                  },
                                }),
                                db.account_customers.destroy({
                                  where: {
                                    Account_id: req.body.Account_id,
                                    Customer_id: newCustomerId,
                                  },
                                }),
                              ])
                                .then(() => {
                                  return res.status(500).json({
                                    message:
                                      "Lỗi khi tạo dữ liệu cho bảng credit_cards",
                                    error: error.message,
                                  });
                                })
                                .catch((deleteError) => {
                                  return res.status(500).json({
                                    message: "Lỗi khi xóa dữ liệu không hợp lệ",
                                    error: deleteError.message,
                                  });
                                });
                            });
                        })
                        .catch((error) => {
                          // Xóa bỏ các bảng đã tạo nếu có lỗi
                          Promise.all([
                            db.accounts.destroy({
                              where: {
                                Account_id: req.body.Account_id,
                              },
                            }),
                            db.account_customers.destroy({
                              where: {
                                Account_id: req.body.Account_id,
                                Customer_id: newCustomerId,
                              },
                            }),
                          ])
                            .then(() => {
                              return res.status(500).json({
                                message:
                                  "Lỗi khi tạo dữ liệu cho bảng customers",
                                error: error.message,
                              });
                            })
                            .catch((deleteError) => {
                              return res.status(500).json({
                                message: "Lỗi khi xóa dữ liệu không hợp lệ",
                                error: deleteError.message,
                              });
                            });
                        });
                    })
                    .catch((error) => {
                      // Xóa bỏ bảng đã tạo nếu có lỗi
                      db.account_customers
                        .destroy({
                          where: {
                            Account_id: req.body.Account_id,
                            Customer_id: newCustomerId,
                          },
                        })
                        .then(() => {
                          return res.status(500).json({
                            message: "Lỗi khi tạo dữ liệu cho bảng accounts",
                            error: error.message,
                          });
                        })
                        .catch((deleteError) => {
                          return res.status(500).json({
                            message: "Lỗi khi xóa dữ liệu không hợp lệ",
                            error: deleteError.message,
                          });
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
        });
    }
  });
};

module.exports = {
  signUp,
  signIn,
  isAuth,
};
