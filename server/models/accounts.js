"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    static associate(models) {
      // define association here

      accounts.hasMany(models.account_customers, {
        foreignKey: "Account_id",
        as: "accountsData",
        targetKey: "Account_id",
      });
    }
  }
  accounts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Account_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Account_Balance: DataTypes.INTEGER,
      Date_Opened: DataTypes.DATEONLY,
      password: DataTypes.STRING,
      Account_Type: DataTypes.STRING,
      PINCode: DataTypes.STRING,
       iNick: DataTypes.STRING,
       OTP: {
        allowNull: true,
        type: DataTypes.STRING,
      },
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
