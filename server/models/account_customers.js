"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account_customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      account_customers.belongsTo(models.customers, {
        foreignKey: "Customer_id",
        targetKey: "id",
        as: "customerData",
      });
      account_customers.belongsTo(models.accounts, {
        foreignKey: "Account_id",
        targetKey: "id",
        as: "accountData",
      });
    }
  }
  account_customers.init(
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
  return account_customers;
};
