"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cc_transactions extends Model {
    static associate(models) {
      // cc_transactions.belongsTo(models.credit_cards, {
      //   foreignKey: "CC_number",
      //   targetKey: "id",
      //   as: "CreditCardcctransactionsData",
      // });
    }
  }
  cc_transactions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CC_number: DataTypes.STRING,
      Transaction_Date: DataTypes.DATEONLY,
      Amount: DataTypes.DECIMAL(10, 2),
      Merchant_Details: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "cc_transactions",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return cc_transactions;
};
