const Pedido =require('./Pedido');
const Producto=require('./Producto');
const Roles=require('./Roles');
const Usuario=require('./Usuario');
const Pedidos_has_productos=require('./Pedidos_has_productos');

//Uno a muchos 
//Un rol tiene muchos usuarios
Roles.hasMany(Usuario,{as:"permiso",foreignKey:"id"})

//se añade una clave rol_id a la tabla de usuarios
Usuario.belongsTo(Roles,{as:"permiso",foreignKey:"rols_id"});

Pedido.belongsTo(Usuario,{
    foreignKey:"usuarios_id"
});

Pedido.belongsToMany(Producto, {
    through: Pedidos_has_productos,
  });

  module.exports = {
    Pedidos_has_productos,
    Pedido,
    Usuario,
    Producto,
    Roles
  };
