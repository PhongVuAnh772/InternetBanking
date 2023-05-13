"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      accounts.hasMany(models.account_customers, {
        foreignKey: "Account_id",
        as: "accountData",
      });
      accounts.hasMany(models.branches, {
        foreignKey: "Branch_id",
        targetKey: "Branch_id",
        as: "branchData",
      });
    }
  }
  accounts.init(
    {
      Account_id: DataTypes.INTEGER,
      Account_Balance: DataTypes.INTEGER,
      Branch_id: DataTypes.INTEGER,
      Date_Opened: DataTypes.DATEONLY,
      Account_Type: DataTypes.STRING(20),
      password: DataTypes.STRING(1000),
    },
    {
      sequelize,
      modelName: "accounts",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return accounts;
};
