"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cc_transactions", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      Amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      Transaction_Date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      Merchant_Details: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cc_transactions");
  },
};
