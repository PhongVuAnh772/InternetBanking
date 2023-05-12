"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customers", {
      Customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      First_Name: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      Last_Name: {
        allowNull: false,
        type: Sequelize.STRING(45),
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
      Email: {
        allowNull: false,
        type: Sequelize.STRING(45),
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
