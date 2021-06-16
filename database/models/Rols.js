const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Rol extends Model {}
Rol.init({
    nombre: DataTypes.STRING,
}, 
{ 
    sequelize,
    modelName: "rol",
    tableName: "rols",
    timestamps: false
})

module.exports = Rols;
