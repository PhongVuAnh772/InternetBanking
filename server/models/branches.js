"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class branches extends Model {
    static associate(models) {
    }
  }
  branches.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Branch_Name: DataTypes.STRING,
      Street_Address: DataTypes.STRING,
      City: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
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
