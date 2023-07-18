"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("credit_cards", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      CC_number: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Maximum_Limit: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      Expiry_Date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      Credit_Score: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      CVC: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      locked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      get_physical_card: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      Customer_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("credit_cards");
  },
};
