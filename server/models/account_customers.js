"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account_customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account_customers.init(
    {
      Account_id: DataTypes.INTEGER,
      Customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "account_customers",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Account_customers;
};
