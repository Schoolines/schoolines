'use strict';
module.exports = function(sequelize, DataTypes) {
  var School = sequelize.define('School', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        School.hasMany(models.User);
      }
    }
  });
  return School;
};
