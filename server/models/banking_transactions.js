"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class banking_transactions extends Model {
    static associate(models) {
      banking_transactions.belongsTo(models.customers, {
        foreignKey: "Customer_id",
        targetKey: "id",
        as: "bankingtransactionsData",
      });
    }
  }
  banking_transactions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Amount: DataTypes.DECIMAL(10, 2),
      Transaction_Type: DataTypes.INTEGER,
      Description: DataTypes.INTEGER,
      Date: DataTypes.STRING(20),
      Customer_id: DataTypes.STRING,
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
