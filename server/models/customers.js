"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    static associate(models) {
      // define association here
      
      customers.hasMany(models.loan, {
        foreignKey: "Customer_id",
        as: "loanData",
        targetKey: "id",
      });
      customers.hasMany(models.banking_transactions, {
        foreignKey: "Customer_id",
        as: "bankingtransactionsData",
        targetKey: "id",
      });
      customers.hasMany(models.credit_cards, {
        foreignKey: "Customer_id",
        as: "creditcardsData",
        targetKey: "id",
      });
      customers.hasMany(models.account_customers, {
        foreignKey: "Customer_id",
        targetKey: "id",

        as: "customerData",
      });
    }
  }
  customers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Full_Name: DataTypes.STRING,
      
      Date_of_Birth: DataTypes.STRING,     
      Country: DataTypes.STRING,
      Email: DataTypes.STRING,
      CMND: DataTypes.STRING,
      Sex: DataTypes.CHAR(1),
    },
    {
      sequelize,
      modelName: "customers",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return customers;
};
