const seq = require("../config/sequelize.config");
const Sequelize = seq.Sequelize, Model = seq.Model, sequelize = seq.sequelize, DataTypes = seq.DataTypes;
const Users = require("./users.model");
class AirQuality extends Model {}

  AirQuality.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ppm: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    modelName: 'AirQuality'
  });

  module.exports = AirQuality;