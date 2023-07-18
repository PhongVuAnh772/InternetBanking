"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("banking_transactions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      
      Transaction_Type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Description: {
        allowNull: true,
        type: Sequelize.STRING(45),
      },
      Amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },

      Date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      Customer_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("banking_transactions");
  },
};
