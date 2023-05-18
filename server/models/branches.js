"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class branches extends Model {
    static associate(models) {
      branches.hasMany(models.accounts, {
        foreignKey: "Branch_id",
        as: "branchData",
      });
      branches.hasMany(models.branch_employees, {
        foreignKey: "Branch_id",
        as: "BranchEmployeesData",
      });
    }
  }
  branches.init(
    {
      Branch_id: DataTypes.INTEGER,

      Branch_Name: DataTypes.STRING,
      Street_Address: DataTypes.STRING,
      City: DataTypes.STRING,
      State: DataTypes.CHAR(2),
      Zipcode: DataTypes.INTEGER,
      Phone_Number: DataTypes.STRING,
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
