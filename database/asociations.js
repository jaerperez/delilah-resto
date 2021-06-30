const Pedido =require('./models/Pedido');
const Producto=require('./models/Producto');
const Rol=require('./models/Roles');
const Usuario=require('./models/Usuario');


//Uno a muchos 
//Un rol tiene muchos usuarios
Rol.hasMany(Usuario,{as:"permiso",foreignKey:"id"})

//se añade una clave rol_id a la tabla de usuarios
Usuario.belongsTo(Rol,{as:"permiso",foreignKey:"rols_id"});