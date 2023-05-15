"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cc_transactions extends Model {
    static associate(models) {
      // define association here
    }
  }
  cc_transactions.init(
    {
      Transaction_Date: DataTypes.DATEONLY,
      CC_Number: DataTypes.STRING(20),
      Amount: DataTypes.DECIMAL(10, 2),
      Merchant_Details: DataTypes.STRING(45),
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
