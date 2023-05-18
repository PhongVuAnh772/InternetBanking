"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account_type extends Model {
    static associate(models) {
      account_type.hasMany(models.accounts, {
        foreignKey: "Account_Type",
        as: "AccountTypeData",
      });
    }
  }
  account_type.init(
    {
      Account_Type: DataTypes.STRING,
      Minimum_Balance_Restriction: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "account_type",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return account_type;
};
