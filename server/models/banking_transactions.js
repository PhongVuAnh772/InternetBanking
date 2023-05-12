"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class banking_transactions extends Model {
    static associate(models) {
      // define association here
    }
  }
  banking_transactions.init(
    {
      Transaction_id: DataTypes.INTEGER,
      Transaction_Type: DataTypes.INTEGER,
      Description: DataTypes.INTEGER,
      Amount: DataTypes.DATEONLY,
      Date: DataTypes.STRING(20),
      Customer_id: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: "banking_transactions",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return banking_transactions;
};
