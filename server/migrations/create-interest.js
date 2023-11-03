"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("interest", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      percent: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      term: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("interest");
  },
};
