const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Pedido extends Model {}
Pedido.init({
    precio_total: DataTypes.INTEGER,
    fecha:DataTypes.DATE,
    estado: DataTypes.ENUM('NUEVO', 'PREPARANDO', 'CONFIRMADO', 'ENVIANDO', 'CANCELADO', 'ENTREGADO'),
    formas_pago: DataTypes.ENUM('TC', 'CASH', 'PSE', 'PAYPAL', 'MP'),
    usuarios_id: DataTypes.INTEGER
}, 
{ 
    sequelize,
    modelName: "pedido",
    tableName: "pedidos",
    timestamps: false
})

module.exports = Pedido;