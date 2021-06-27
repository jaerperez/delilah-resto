const Pedido =require('./Pedido');
const Producto=require('./Producto');
const Roles=require('./Roles');
const Usuario=require('./Usuario');


//Uno a muchos 
//Un rol tiene muchos usuarios
Roles.hasMany(Usuario,{as:"permiso",foreignKey:"id"})

//se añade una clave rol_id a la tabla de usuarios
Usuario.belongsTo(Roles,{as:"permiso",foreignKey:"rols_id"});