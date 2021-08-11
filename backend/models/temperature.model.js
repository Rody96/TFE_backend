module.exports = (sequelize, Sequelize) => {
  const Temperature = sequelize.define("temperatures", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    temperature: {
      type: Sequelize.FLOAT,
      allowNull:false
    },
  },{
    sequelize,
    modelName: 'Temperature'
});

  return Temperature;
};