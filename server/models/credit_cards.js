"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class credit_cards extends Model {
    static associate(models) {
      credit_cards.belongsTo(models.customers, {
        foreignKey: "Customer_id",
        targetKey: "id",
        as: "creditcardsData",
      });
      // credit_cards.hasMany(models.cc_transactions, {
      //   foreignKey: "CC_number",
      //   as: "CreditCardcctransactionsData",
      // });
    }
  }
  credit_cards.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CC_number: DataTypes.STRING,
      Maximum_Limit: DataTypes.DECIMAL(10, 2),
      Expiry_Date: DataTypes.DATEONLY,
      Credit_Score: DataTypes.INTEGER,
      CVC: DataTypes.INTEGER,
      locked: DataTypes.BOOLEAN,
      get_physical_card: DataTypes.BOOLEAN,
      Customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "credit_cards",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return credit_cards;
};
