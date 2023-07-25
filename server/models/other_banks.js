"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class other_banks extends Model {
    static associate(models) {
      other_banks.hasMany(models.banking_transactions, {
        foreignKey: "other_bank_id",
        targetKey: 'id',
        as: "otherbankData",
      })
    }
  }
  other_banks.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      other_banks_name: DataTypes.STRING,
      other_banks_longName: DataTypes.STRING,
      other_banks_icons: DataTypes.BLOB,
      BINCode: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: "other_banks",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return other_banks;
};
