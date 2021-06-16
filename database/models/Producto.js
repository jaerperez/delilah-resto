const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Producto extends Model {}
Producto.init({
    nombre: DataTypes.STRING,
    precio:DataTypes.DOUBLE,
    activo: DataTypes.BOOLEAN,
    imagen: DataTypes.STRING,
}, 
{ 
    sequelize,
    modelName: "producto",
    tableName: "productos",
    timestamps: false
})

module.exports = Producto;