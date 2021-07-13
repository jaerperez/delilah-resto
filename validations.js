
const {
  Producto,
  Pedido,
  Usuario,
  Roles,
  Pedidos_has_productos
} = require("./database/models");
const { restore } = require("./database/models/Pedido");


/* ==================== Validaciones para productos ===================
=========================================================================
*/

const validarBodyProducto = (req, res, next) => {
  if (
    !req.body.nombre ||
    !req.body.precio ||
    !req.body.activo ||
    !req.body.imagen
  ) {
    res.status(400).json({
      error: "Debe enviar los datos completos del producto",
    });
  } else {
    next();
  }
}

/* ==================== Validaciones para usuarios ===================
=========================================================================
*/
// validación body login tenga valores 
const validarBodyLogin = (req, res, next) => {
  if (
    !req.body.correo ||
    !req.body.contrasena
  ) {
    res.status(400).json({
      error: "Debe loguearse con su correo y contraseña",
    });
  } else {
    next();
  }
};

//verifica que el usuario exista en la base de datos
const verificarLogin = async (req, res, next) => {
  const loginOk = await Usuario.findOne({
    where: {
      correo: req.body.correo,
      contrasena: req.body.contrasena
    }
  });

  if (!loginOk) {
    res.status(400).json({
      error: "Credenciales incorrectas"
    })
  } else {
    next();
  }
};

//Valida que el usuario tenga permisos 
const ValidoAdmon = async (req, res, next) => {
  const usuario = await Usuario.findByPk(req.body.user, {
    include: [{
      model: Roles,
      as: "permiso",
      attributes: [
        'id', 'nombre'
      ]
    }]
  });
  if (usuario.permiso.nombre == "admin") {
    next();
  } else {
    res.status(401).json({ error: "Acceso Denegado" })
  }
}

// validación de usuario en DB si existe
const validarUsuarioNombre = async (req, res, next) => {
  const usuarioExistente = await Usuario.findOne({
    where: {
      usuario: req.body.usuario
    }
  });
  if (usuarioExistente) {
    res.status(409).json({ error: `El nombre pertenece a un usuario registrado` });
  } else {
    next();
  }
}

// validación de correo en DB si existe
const validarUsuarioCorreo = async (req, res, next) => {
  const usuarioExistente = await Usuario.findOne({
    where: {
      correo: req.body.correo
    }
  });

  if (usuarioExistente) {
    res.status(409).json({ error: `Ya existe una cuenta registrada con el correo` });
  } else {
    next();
  }
}


/* ==================== Validaciones para pedidos ===================
=========================================================================
*/

const validarEstadoPedido = (req, res, next) => {
  const estado = req.body.estado;
  if (estado == 1 || estado == 2 || estado == 3 || estado == 4 || estado == 5 || estado == 6) {
    req.nuevoestado = estado;
    next();
  } else {
    res.status(400).json({ error: "Estado incorrecto" });
    
  }
}



module.exports = { ValidoAdmon, validarBodyProducto, validarBodyLogin, verificarLogin, validarUsuarioNombre, validarUsuarioCorreo, validarEstadoPedido,validarEstadoPedido };