"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("credit_cards", {
      CC_number: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("credit_cards");
  },
};
