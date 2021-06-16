const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Usuario extends Model {}
Usuario.init({
    usuario:DataTypes.STRING,
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    rols_id: DataTypes.INTEGER
}, 
{ 
    sequelize,
    modelName: "usuario",
    tableName: "usuarios",
    timestamps: false
})

module.exports = Usuario;
