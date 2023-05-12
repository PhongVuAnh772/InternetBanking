"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account_type extends Model {
    static associate(models) {
      // define association here
    }
  }
  Account_type.init(
    {
      Account_Type: DataTypes.STRING(20),
      Minimum_Balance_Restriction: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "account_type",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Account_type;
};
