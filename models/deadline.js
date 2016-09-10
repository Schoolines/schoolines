'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deadline = sequelize.define('Deadline', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    module: {type: DataTypes.STRING, allowNull: false},
    due: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
          Deadline.belongsTo(models.User, {
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
              foreignKey: "contributorId"
          });
      }
    }
  });
  return Deadline;
};
