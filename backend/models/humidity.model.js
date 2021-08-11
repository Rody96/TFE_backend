module.exports = (sequelize, Sequelize) => {
  const Humidity = sequelize.define("humidity", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    airHumidity: {
      type: Sequelize.FLOAT,
      allowNull:false
    },
  },{
    sequelize,
    modelName: 'Humidity'
});

  return Humidity;
};