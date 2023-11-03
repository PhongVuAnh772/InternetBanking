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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
      Account_Type: {
        allowNull: false,
        type: Sequelize.STRING,
        foreignKey: true,
      },
      PINCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      iNick: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      OTP: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accounts");
  },
};
