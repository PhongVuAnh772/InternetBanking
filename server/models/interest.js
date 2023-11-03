"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class interest extends Model {
    static associate(models) {
      // define association here

     
    }
  }
  interest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      percent: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      term: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "interest",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return interest;
};
