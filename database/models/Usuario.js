const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index');

class Usuario extends Model {}
Usuario.init({
    usuario:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlphanumeric:true,
            notNull:{msg: 'Por favor ingrese usuario'},
            len: [5, 10]
        }
    },
    nombre: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{msg:'por favor ingresar nombre'}  
        }
    },
    correo: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail:true,
            notNull:{msg:'por favor ingresar correo'} 
        }
    },
    telefono: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            isNumeric:true,
            notNull:{msg:'por favor ingresar teléfono'}     
        }
    },
    direccion: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{msg:'por favor ingresar dirección '}
        }
    },
    contrasena: {
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{msg:'por favor ingresar contraseña'},
            len: [5, 10],
        }
    },
    rols_id:  {
        type:DataTypes.INTEGER,
        defaultValue:2
    }
},
{ 
    sequelize,
    modelName: "usuario", //no es necesario 
    tableName: "usuarios",
    timestamps: false
});



module.exports = Usuario;
