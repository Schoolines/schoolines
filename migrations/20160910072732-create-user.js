'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      authToken: {
        type: Sequelize.TEXT
      },
      faculty: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      firstMajor: {
        type: Sequelize.STRING
      },
      secondMajor: {
        type: Sequelize.STRING
      },
      matriculationYear: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      exp: {
        type: Sequelize.INTEGER
      },
      matricNumber: {
        type: Sequelize.STRING,
        unique: true
      },
      schoolId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Schools",
            key: "id"
        }
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
