"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      // define association here
      accounts.hasMany(models.account_customers, {
        foreignKey: "Account_id",
        as: "accountData",
      });

      accounts.belongsTo(models.branches, {
        foreignKey: "Branch_id",
        targetKey: "id",
        as: "branchData",
      });
    }
  }
  accounts.init(
    {
      Account_Balance: DataTypes.INTEGER,
      Branch_id: DataTypes.INTEGER,
      Date_Opened: DataTypes.DATEONLY,
      Account_Type: DataTypes.STRING(20),
      password: DataTypes.STRING(1000),
      Account_Type: DataTypes.INTEGER,
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
