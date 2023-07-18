"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class other_banks extends Model {
    static associate(models) {
    
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
      other_banks_icons: DataTypes.BLOB
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
