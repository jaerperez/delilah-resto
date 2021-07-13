const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const Pedido = require("./Pedido");
const Producto = require("./Producto");

const pedidos_has_productos = sequelize.define(
  "pedidos_has_productos",
  {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pedidos_id: {
      field: "pedidos_id",
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: Pedido,
        key: "id",
      },
    },
    productos_id: {
      field: "productos_id",
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        model: Producto,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "pedidos_has_productos",
    underscored: true,
  }
);

module.exports = pedidos_has_productos;
