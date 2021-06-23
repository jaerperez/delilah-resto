const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Rol extends Model {}
Rol.init({
    nombre: DataTypes.STRING,
}, 
{ 
    sequelize,
    modelName: "rol",
    tableName: "roles",
    timestamps: false
})

module.exports = Rol;
