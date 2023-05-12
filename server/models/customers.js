"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customers extends Model {
    static associate(models) {
      // define association here
    }
  }
  customers.init(
    {
      Customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      First_Name: DataTypes.STRING(45),
      Last_Name: DataTypes.STRING(45),
      Date_of_Birth: DataTypes.DATEONLY,
      Street_Address: DataTypes.STRING(50),
      City: DataTypes.STRING(25),
      State: DataTypes.CHAR(2),
      Zipcode: DataTypes.INTEGER,
      Email: DataTypes.STRING(45),
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
