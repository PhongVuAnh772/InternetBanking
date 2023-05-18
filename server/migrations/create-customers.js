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
      Customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      First_Name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Last_Name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Date_of_Birth: {
        allowNull: false,
        type: Sequelize.DATEONLY,
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
      Email: {
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
