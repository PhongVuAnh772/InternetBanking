"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      account_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,

        type: Sequelize.INTEGER.UNSIGNED,
      },
      Account_Balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      Date_Opened: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(1000),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accounts");
  },
};
