'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    authToken: DataTypes.STRING,
    faculty: DataTypes.STRING,
    email: DataTypes.STRING,
    firstMajor: DataTypes.STRING,
    secondMajor: DataTypes.STRING,
    matriculationYear: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    exp: DataTypes.INTEGER,
    matricNumber: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};