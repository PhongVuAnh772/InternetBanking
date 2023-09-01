const db = require("../models/index");

const checkSTKBank = async (req, res) => {
  db.accounts
    .findOne({
      where: {
        Account_id: req.body.Account_id,
      },
    })
    .then((dbUser) => {
      if (dbUser) {
        db.account_customers
          .findOne({
            where: {
              Account_id: dbUser.Account_id,
            },
          })
          .then((dbAccountCustomer) => {
            db.customers
              .findOne({
                where: {
                  id: dbAccountCustomer.Customer_id,
                },
              })
              .then((dbCustomers) => {
                return res.status(200).json({
                  success: true,

                  message: "Tài khoản đã tìm thấy",
                  data: dbUser,
                  dbCustomers: dbCustomers,
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
          })
          .catch((error) => {
            // Xử lý lỗi
            console.log(error);
            res.status(200).send({
              success: false,
              error: "Lỗi khi tìm dữ liệu bảng account_customer",
            });
          });
      } else {
        return res.status(200).json({
          success: false,
          message: "Không tìm thấy ng dùng",
        });
      }
    })
    .catch((error) => {
      // Xử lý lỗi
      console.log(error);
      res.status(200).send({
        success: false,
        error: "Server hiện tại bảo trì, vui lòng thử lại sau ít phút",
      });
    });
};

const checkINickBank = async (req, res) => {
  db.accounts
    .findOne({
      where: {
        iNick: req.body.iNick,
      },
    })
    .then((dbUser) => {
      if (dbUser) {
        db.account_customers
          .findOne({
            where: {
              Account_id: dbUser.Account_id,
            },
          })
          .then((dbAccountCustomer) => {
            db.customers
              .findOne({
                where: {
                  id: dbAccountCustomer.Customer_id,
                },
              })
              .then((dbCustomers) => {
                return res.status(200).json({
                  success: true,

                  message: "Tài khoản đã tìm thấy",
                  data: dbUser,
                  dbCustomers: dbCustomers,
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
          })
          .catch((error) => {
            // Xử lý lỗi
            console.log(error);
            res.status(200).send({
              success: false,
              error: "Lỗi khi tìm dữ liệu bảng account_customer",
            });
          });
      } else {
        return res.status(200).json({
          success: false,
          message: "Không tìm thấy ng dùng",
        });
      }
    })
    .catch((error) => {
      // Xử lý lỗi
      console.log(error);
      res.status(200).send({
        success: false,
        error: "Server hiện tại bảo trì, vui lòng thử lại sau ít phút",
      });
    });
};

module.exports = {
  checkSTKBank,
  checkINickBank,
};
