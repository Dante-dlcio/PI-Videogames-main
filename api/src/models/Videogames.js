const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogames', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    platforms:{
      type: DataTypes.STRING(255)
    },
    created:{
      type: DataTypes.BOOLEAN,
    }
    
  },{
    timestapms:false,
  });
};
