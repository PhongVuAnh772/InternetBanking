const db = require("../models/index");
const moment = require("moment");

const changeLocked = (req, res) => {
  db.credit_cards
    .findOne({
      where: {
        CC_number: req.body.CC_number,
      },
    })
    .then((dataAccountCustomer) => {
      dataAccountCustomer
        .update({ locked: !dataAccountCustomer.locked })
        .then((updatedCreditCard) => {
          res.json({
            success: true,
            message: "Đổi thuộc tính khóa thẻ thành công.",
            creditCard: updatedCreditCard,
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: "Đổi thuộc tính khóa thẻ thất bại",
          });
        });
    })
    .catch((error) => {
      console.error("Error finding credit card:", error);
      res
        .status(500)
        .json({ success: false, message: "Đổi thuộc tính khóa thẻ thất bại" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "Lấy dữ liệu thất bại" });
    });
};

const changePhysicalCards = (req, res) => {
  db.credit_cards
    .findOne({
      where: {
        CC_number: req.body.CC_number, // Invert the value of "locked" to find the opposite status
      },
    })
    .then((dataAccountCustomer) => {
      dataAccountCustomer
        .update({ get_physical_card: !dataAccountCustomer.get_physical_card })
        .then((updatedCreditCard) => {
          return res.json({
            success: true,
            message: "Đổi thuộc tính lấy thẻ cứng thành công.",
            creditCard: updatedCreditCard,
          });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ success: false, message: "Failed to update credit card." });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Failed to find credit card." });
    });
};

const changeDataPINCode = (req, res) => {
  db.accounts
    .findOne({
      where: {
        Account_id: req.body.Account_id,
      },
    })
    .then((dataAccountCustomer) => {
      dataAccountCustomer
        .update({ PINCode: req.body.PINCode })
        .then((updatedPIN) => {
          return res.json({
            success: true,
            message: "Đổi mã PIN thành công.",
            creditCard: updatedPIN,
          });
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ success: false, message: "Đổi mã PIN thất bại" });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Lấy thông tin thất bại." });
    });
};
// 2027-07-25

const updateCreditScore = (req, res) => {
  db.account_customers
    .findOne({
      where: {
        Account_id: req.body.Account_id,
      },
    })
    .then((dataAccountCustomers) => {
      db.customers
        .findOne({
          where: {
            id: dataAccountCustomers.Customer_id,
          },
        })
        .then((datacustomers) => {
          db.credit_cards
            .findOne({
              where: {
                Customer_id: datacustomers.id,
              },
            })
            .then((dataCredit) => {
              db.accounts
                .findOne({
                  where: {
                    Account_id: dataAccountCustomers.Account_id,
                  },
                })
                .then((dataAccounts) => {
                  function calculateYearsFromDays(days) {
                    return days / 365;
                  }
                  function updateCoinByYears(dateOpened, years) {
                    const coinPerYear = 1;
                    return years * coinPerYear;
                  }
                  const currentDate = moment();
                  const daysSinceOpened = currentDate.diff(
                    dataAccounts.Date_Opened,
                    "days"
                  );
                  const yearsSinceOpened =
                    calculateYearsFromDays(daysSinceOpened);
                  let newDataCreditScore = updateCoinByYears(
                    dataAccounts.Date_Opened,
                    yearsSinceOpened
                  );
                  if (dataAccounts.Date_Opened) {
                    dataCredit
                      .update({ Credit_Score: newDataCreditScore })
                      .then((updatedCreditScore) => {
                          
                          return res.json({
                            success: true,
                            message: "Đổi thuộc tính lấy điểm thẻ thành công.",
                            updatedCreditScore: updatedCreditScore,
                            datacustomers: datacustomers,
                            dataCreditScoreMoneyToSTK: Math.floor(dataAccounts.Account_Balance) + (Math.floor(newDataCreditScore) * 10000.00),
                            dataCreditScoreMoney: Math.floor(newDataCreditScore) * 10000.00,
                            defaultCreditScore: dataCredit.Credit_Score,
                            dataAccounts: dataAccounts
                          });
                        
                      })
                      .catch((error) => {
                        return res.status(500).json({
                          success: false,
                          message: "Failed to update Credit_Score",
                          error: error,
                        });
                      });
                  }
                })
                .catch((error) => {
                  return res.status(500).json({
                    success: false,
                    message: "Failed to find credit_cards",
                  });
                });
            })
            .catch((error) => {
              return res.status(500).json({
                success: false,
                message: "Failed to find credit_cards",
              });
            });
        })
        .catch((error) => {
          return res.status(500).json({
            success: false,
            message: "Failed to find customers.",
            error: error,
          });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ success: false, message: "Đổi mã PIN thất bại" });
    });
};

module.exports = {
  changeLocked,
  changePhysicalCards,
  changeDataPINCode,
  updateCreditScore,
};
