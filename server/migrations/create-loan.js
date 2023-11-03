"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("loan", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      Duration_in_Years: {
        allowNull: true,
        type: Sequelize.DECIMAL(4, 2),
      },

      Loan_Transaction_Date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      Interest_Rate: {
        allowNull: true,
        type: Sequelize.DECIMAL(4, 2),
      },
      Loan_Amount_Taken: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      Loan_Amount_Repaid: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
        defaultValues: "0.00",
      },
      Loan_Type: {
        allowNull: false,
        type: Sequelize.STRING(45),
      },
      Customer_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.INTEGER,
      },
      // interest_id: {
      //   allowNull: false,
      //   foreignKey: true,
      //   type: Sequelize.INTEGER,
      // },
      // status: {
      //   allowNull: false,
      //   foreignKey: true,
      //   type: Sequelize.BOOLEAN,
      // },
      // updated_date: {
      //   allowNull: false,
      //   foreignKey: true,
      //   type: Sequelize.BOOLEAN,
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("loan");
  },
};
