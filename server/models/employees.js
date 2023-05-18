"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    static associate(models) {
      employees.hasMany(models.branch_employees, {
        foreignKey: "Employee_id",
        as: "BranchEmployeesemployeesData",
      });
    }
  }
  employees.init(
    {
      Employee_id: DataTypes.INTEGER,
      First_Name: DataTypes.STRING,
      Last_Name: DataTypes.STRING,
      Supervisor_id: DataTypes.INTEGER.UNSIGNED,
      Level_of_Access: DataTypes.STRING,
      Date_of_Birth: DataTypes.DATEONLY,
      Street_Address: DataTypes.STRING,
      City: DataTypes.STRING,
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
