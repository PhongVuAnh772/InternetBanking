"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    static associate(models) {
      // define association here
    }
  }
  Accounts.init(
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
  return Accounts;
};
