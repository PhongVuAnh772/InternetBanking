const db = require("../models/index");

const forgetPassword = (req, res) => {
  const { Account_id, CC_number, Expiry_Date,CMND,Email } = req.body;

  db.customers
    .findOne({
      where: {
        CMND: CMND,
        Email: Email
      },
    })
    .then((customer) => {
      

      db.credit_cards
        .findOne({
          where: {
            CC_number: CC_number,
            Expiry_Date: Expiry_Date,
            Customer_id: customer.id
          },
        })
        .then((creditCard) => {
          if (!creditCard) {
            return res
              .status(404)
              .json({ success: false, message: "Credit card not found." });
          }
          db.accounts.findOne({
            where: {
              Account_id: Account_id,
            },
          })
          .then((accounts) => {
          if (!accounts) {
            return res.status(404).json({ success: false, message: 'Credit card not found.' });
          }
          db.account_customers.findOne({
            where: {
              Account_id: accounts.Account_id,
              Customer_id: customer.id,
            },
          })
          .then(data => {
            if (!data) {
            return res.status(404).json({ success: false, message: 'Sai thông tin.' });
            }
            return res.status(200).json({ success: true, message: 'Thông tin chính xác' });
          })
        
        })

        })
        .catch((error) => {
          console.error("Error finding credit card:", error);
          return res
            .status(500)
            .json({ success: false, error: "Failed to find credit card." });
        });
    })
    .catch((error) => {
      console.error("Error finding account:", error);
      return res
        .status(500)
        .json({ success: false, error: "Failed to find account." });
    });
};

const changePassWord = (req, res) => {};

module.exports = {
  forgetPassword,
  changePassWord,
};
