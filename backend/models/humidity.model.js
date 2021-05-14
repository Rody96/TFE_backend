const seq = require("../config/sequelize.config");
const Sequelize = seq.Sequelize, Model = seq.Model, sequelize = seq.sequelize, DataTypes = seq.DataTypes;
const Users = require("./users.model");
class Humidity extends Model {}

  Humidity.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    airHumidity: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: 'id'
    }
  }
  },{
      sequelize,
      modelName: 'Humidity'
  });

  module.exports = Humidity;