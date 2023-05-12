"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("account_customers", {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("account_customers");
  },
};
