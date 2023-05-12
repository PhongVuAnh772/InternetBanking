"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branches", {
      Branch_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      Branch_Name: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      Branch_Address: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      Branch_Address: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      city: {
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
