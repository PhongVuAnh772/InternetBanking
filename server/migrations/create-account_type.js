"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("account_type", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      Account_type: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Minimum_Balance_Restriction: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("account_type");
  },
};
