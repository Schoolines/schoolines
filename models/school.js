'use strict';
module.exports = function(sequelize, DataTypes) {
  var School = sequelize.define('School', {
    name: {type:DataTypes.STRING, unique:true}
  }, {
    classMethods: {
      associate: function(models) {
        School.hasMany(models.User);
      }
    }
  });
  return School;
};
