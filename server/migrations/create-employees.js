"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employees", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      First_Name: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      Last_Name: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      Supervisor_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      Level_of_Access: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      Date_of_Birth: {
        allowNull: false,
        type: Sequelize.DATEONLY,
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
      Sex: {
        allowNull: false,
        type: Sequelize.CHAR(1),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employees");
  },
};
