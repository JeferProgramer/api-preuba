const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('artobjects', {
    id: {
      type: DataTypes.UUID,//es un identifacor random con letras y numeros
      defaultValue: DataTypes.UUIDV4, //me genera automaticamente un identificador universal
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkWeb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};