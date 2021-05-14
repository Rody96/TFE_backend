  
const seq = require("../config/sequelize.config");
const Sequelize = seq.Sequelize, Model = seq.Model, sequelize = seq.sequelize, DataTypes = seq.DataTypes;
class Users extends Model {}

    Users.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  mail: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  password: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  firstName: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
  },
  fanState: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  }
},{
    sequelize,
    modelName: 'Users',
  });

  module.exports = Users;
