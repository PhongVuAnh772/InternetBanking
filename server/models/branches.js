"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class branches extends Model {
    static associate(models) {
      // define association here
    }
  }
  branches.init(
    {
      Branch_id: DataTypes.INTEGER,
      Branch_Name: DataTypes.STRING(45),
      Street_Address: DataTypes.STRING(50),
      City: DataTypes.STRING(25),
      State: DataTypes.CHAR(2),
      Zipcode: DataTypes.INTEGER,
      Phone_Number: DataTypes.STRING(12),
    },
    {
      sequelize,
      modelName: "branches",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return branches;
};
