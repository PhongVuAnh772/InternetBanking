"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      Full_Name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      
      Date_of_Birth: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      
      Country: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      
      Email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      CMND: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Sex: {
        allowNull: false,
        type: Sequelize.CHAR(1),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customers");
  },
};
