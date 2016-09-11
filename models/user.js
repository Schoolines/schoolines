'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    authToken: {type: DataTypes.TEXT, unique: true},
    faculty: DataTypes.STRING,
    email: DataTypes.STRING,
    firstMajor: DataTypes.STRING,
    secondMajor: DataTypes.STRING,
    matriculationYear: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    exp: DataTypes.INTEGER,
    matricNumber: {type: DataTypes.STRING, unique: true}
  }, {
    classMethods: {
      associate: function(models) {
          User.belongsTo(models.School, {
              onUpdate: "CASCADE",
              foreignKey: "schoolId"
          });
          User.hasMany(models.Deadline);
      }
    }
  });
  return User;
};
