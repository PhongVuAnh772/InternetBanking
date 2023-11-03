"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class loan extends Model {
    static associate(models) {
      loan.belongsTo(models.customers, {
        foreignKey: "Customer_id",
        as: "loanData",
      });
    }
  }
  loan.init(
    {
id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Duration_in_Years: DataTypes.DECIMAL(4, 2),
      Loan_Transaction_Date: DataTypes.DATEONLY,
      Interest_Rate: DataTypes.DECIMAL(4, 2),
      Loan_Amount_Taken: DataTypes.DECIMAL(10, 2),
      Loan_Amount_Repaid: DataTypes.DECIMAL(10, 2),
      Loan_Type: DataTypes.STRING,
      Customer_id: DataTypes.INTEGER,
      // interest_id: {
      //   allowNull: false,
      //   foreignKey: true,
      //   type: DataTypes.INTEGER,
      // },
      // status: {
      //   allowNull: false,
      //   foreignKey: true,
      //   type: DataTypes.BOOLEAN,
      // },
      // updated_date: {
      //   allowNull: false,
      //   foreignKey: true,
      //   type: DataTypes.BOOLEAN,
      // }
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
