const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Pedidos_has_productos extends Model {}
Pedidos_has_productos.init({
    pedidos_id: DataTypes.INTEGER,
    productos_id:DataTypes.INTEGER,
    cantidad:DataTypes.INTEGER
}, 
{ 
    sequelize,
    modelName: "pedidos_has_productos",
    tableName: "pedidos_has_productos",
    timestamps: false
})

module.exports = Pedidos_has_productos;