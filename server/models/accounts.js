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

      accounts.belongsTo(models.account_type, {
        foreignKey: "Account_Type",
        targetKey: "id",
        as: "AccountTypeData",
      });
    }
  }
  accounts.init(
    {
      Account_id: DataTypes.INTEGER,

      Account_Balance: DataTypes.INTEGER,
      Branch_id: DataTypes.INTEGER,
      Date_Opened: DataTypes.DATEONLY,
      password: DataTypes.STRING,
      Account_Type: DataTypes.STRING,
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
