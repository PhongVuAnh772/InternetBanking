"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class credit_cards extends Model {
    static associate(models) {
      credit_cards.belongsTo(models.customers, {
        foreignKey: "Customer_id",
        targetKey: "Customer_id",
        as: "CreditCardData",
      });
    }
  }
  credit_cards.init(
    {
      CC_number: DataTypes.STRING(20),
      Maximum_Limit: DataTypes.DECIMAL(10, 2),
      Expiry_Date: DataTypes.DATEONLY,
      Credit_Score: DataTypes.INTEGER,
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
