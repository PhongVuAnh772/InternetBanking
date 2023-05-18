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
      Branch_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Branch_Name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Street_Address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      City: {
        allowNull: false,
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("branches");
  },
};
