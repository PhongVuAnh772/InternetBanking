"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class banking_transactions extends Model {
    static associate(models) {
      banking_transactions.belongsTo(models.customers, {
        foreignKey: "Customer_id",
        as: "bankingtransactionsData",
      });
      banking_transactions.belongsTo(models.customers, {
        foreignKey: "other_bank_id",
        as: "otherbankData",
      });
    }
  }
  banking_transactions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
                allowNull: false,

      },
      Amount: DataTypes.DECIMAL(10, 2),
      Transaction_Type: DataTypes.INTEGER,
      Description: DataTypes.INTEGER,
      Date: DataTypes.DATEONLY,
      Payee: DataTypes.STRING,
      recipient_account_number: DataTypes.STRING,
      Customer_id: DataTypes.STRING,
      recipient_accounts_id: DataTypes.INTEGER,
      other_bank_id: DataTypes.INTEGER,
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
