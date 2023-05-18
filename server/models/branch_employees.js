"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class branch_employees extends Model {
    static associate(models) {
      branch_employees.belongsTo(models.branches, {
        foreignKey: "Branch_id",
        targetKey: "id",
        as: "BranchEmployeesbranchesData",
      });
      branch_employees.belongsTo(models.employees, {
        foreignKey: "Employee_id",
        targetKey: "id",
        as: "BranchEmployeesemployeesData",
      });
    }
  }
  branch_employees.init(
    {
      Branch_id: DataTypes.INTEGER,
      Employee_id: DataTypes.INTEGER,
      Start_Date: DataTypes.DATEONLY,
      End_Date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "branch_employees",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return branch_employees;
};
