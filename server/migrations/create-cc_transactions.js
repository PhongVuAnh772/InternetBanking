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
      
      CC_number: {
        type: Sequelize.STRING,
        allowNull: false,
        foreignKey: true,
      },

      Transaction_Date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      Amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      Merchant_Details: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      recipient_accounts_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cc_transactions");
  },
};
