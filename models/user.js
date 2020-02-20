'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model { };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          message: "Please fill username!"
        },
        notEmpty: {
          args: true,
          message: "Please fill username!"
        },
      }
    },
    room: {
      type: DataTypes.STRING
    },
    step: {
      type: DataTypes.INTEGER
    }
  }, { sequelize });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};