"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("other_banks", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      other_banks_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      other_banks_longName: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      other_banks_icons: {
        allowNull: false,
        type: Sequelize.BLOB,
      },
      BINCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("other_banks");
  },
};
