"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("branch_employees", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      Branch_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      Employee_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      Start_Date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      End_Date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("branch_employees");
  },
};
