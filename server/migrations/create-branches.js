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
      latitude: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      longitude: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("branches");
  },
};
