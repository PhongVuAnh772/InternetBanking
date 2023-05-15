"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branches", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      Branch_Name: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      Street_Address: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      City: {
        allowNull: false,
        type: Sequelize.STRING(25),
      },
      State: {
        allowNull: false,
        type: Sequelize.CHAR(2),
      },
      Zipcode: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Phone_Number: {
        allowNull: false,
        type: Sequelize.STRING(12),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("branches");
  },
};
