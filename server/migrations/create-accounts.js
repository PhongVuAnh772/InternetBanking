"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accounts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      Account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Account_Balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      Branch_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
      },

      Date_Opened: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Account_Type: {
        allowNull: false,
        type: Sequelize.STRING,
        foreignKey: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accounts");
  },
};
