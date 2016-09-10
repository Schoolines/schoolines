'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      upVote: {
        type: Sequelize.BOOLEAN
      },
      voterId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Users",
            key: "id"
        }
      },
      deadlineId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Deadlines",
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
    return queryInterface.dropTable('Votes');
  }
};
