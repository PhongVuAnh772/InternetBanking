"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loan extends Model {
    static associate(models) {
      // define association here
    }
  }
  loan.init(
    {
      Loan_id: DataTypes.INTEGER,
      Duration_in_Years: DataTypes.DECIMAL(4, 2),
      Loan_Start_Date: DataTypes.DATEONLY,
      Interest_Rate: DataTypes.DECIMAL(4, 2),
      Loan_Amount_Taken: DataTypes.DECIMAL(10, 2),
      Loan_Amount_Repaid: DataTypes.DECIMAL(10, 2),
      Loan_Type: DataTypes.STRING(45),
      Customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "loan",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return loan;
};
