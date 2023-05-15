"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    static associate(models) {
      // define association here
    }
  }
  employees.init(
    {
      First_Name: DataTypes.STRING(45),
      Last_Name: DataTypes.STRING(45),
      Supervisor: DataTypes.INTEGER.UNSIGNED,
      Level_of_Access: DataTypes.STRING(15),
      Date_of_Birth: DataTypes.DATEONLY,
      Street_Address: DataTypes.STRING(50),
      City: DataTypes.STRING(25),
      State: DataTypes.CHAR(2),
      Zipcode: DataTypes.INTEGER,
      Sex: DataTypes.CHAR(1),
    },
    {
      sequelize,
      modelName: "employees",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return employees;
};
