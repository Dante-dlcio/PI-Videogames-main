const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define(
    "genre",
    {
      id: {
        type: DataTypes.UUID,
        defaultValues: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      api_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created: {
        type: DataTypes.BOOLEAN,
        toDefaultValue: false,
      },
    },
    {
      timeStamps: false,
      underscored: true,
    }
  );
};
