'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clauses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      maxPoint: {
        type: Sequelize.INTEGER,
      },
      yayinSayisiFormula:{
        type: Sequelize.STRING,
      },
      enAzPuanFormula:{
        type: Sequelize.STRING,
      },
      professionId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Professions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clauses');
  }
};