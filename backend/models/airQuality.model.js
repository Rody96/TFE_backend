module.exports = (sequelize, Sequelize) => {
  const AirQuality = sequelize.define("airquality", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ppm: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
  },{
    sequelize,
    modelName: 'AirQuality'
  });

  return AirQuality;
};