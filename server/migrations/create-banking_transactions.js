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

      Amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      Transaction_Type: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      Description: {
        allowNull: true,
        type: Sequelize.STRING(45),
      },
      Date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("banking_transactions");
  },
};
