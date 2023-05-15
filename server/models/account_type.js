"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account_type extends Model {
    static associate(models) {}
  }
  account_type.init(
    {
      Account_Type: DataTypes.INTEGER,
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
