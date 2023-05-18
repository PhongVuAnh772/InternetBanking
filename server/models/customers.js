"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    static associate(models) {
      // define association here
      customers.hasMany(models.account_customers, {
        foreignKey: "Customer_id",
        as: "customerData",
      });
      customers.hasMany(models.loan, {
        foreignKey: "Customer_id",
        as: "loanData",
      });
      customers.hasMany(models.banking_transactions, {
        foreignKey: "Customer_id",
        as: "bankingtransactionsData",
      });
      customers.hasMany(models.credit_cards, {
        foreignKey: "Customer_id",
        as: "creditcardsData",
      });
    }
  }
  customers.init(
    {
      Customer_id: DataTypes.INTEGER,
      First_Name: DataTypes.STRING,
      Last_Name: DataTypes.STRING,
      Date_of_Birth: DataTypes.DATEONLY,
      Street_Address: DataTypes.STRING,
      City: DataTypes.STRING,
      State: DataTypes.CHAR(2),
      Zipcode: DataTypes.INTEGER,
      Email: DataTypes.STRING,
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
