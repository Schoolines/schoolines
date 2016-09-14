'use strict';
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define('Vote', {
    upVote: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
          Vote.belongsTo(models.User, {
              onUpdate: "CASCADE",
              foreignKey: "userId"
          });

          Vote.belongsTo(models.Deadline, {
              onUpdate: "CASCADE",
              foreignKey: "deadlineId"
          });
      }
    }
  });
  return Vote;
};
