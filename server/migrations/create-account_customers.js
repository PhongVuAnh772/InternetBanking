"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("account_customers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      Account_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      Customer_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("account_customers");
  },
};
