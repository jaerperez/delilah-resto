const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

//como se guarda en variables de entorno
const secretJWT = "escribiralgomuyseguro1234-lbjnwef89h234234rbhjui";
const db = require('./database');
require('./database/models/asociations');

const server = express();
const PORT = 3003;
// instanciar modelos
const Producto = require('./database/models/Producto');
const Pedido = require('./database/models/Pedido');
const Roles = require('./database/models/Roles');
const Usuario = require('./database/models/Usuario');

// middlewares
server.use(helmet());
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(
  expressJwt({
    secret: secretJWT,
    algorithms: ["HS256"],
  }).unless({
    path: ["/login","/register","/usuarios"]
  })
);


//====================== Productos =====================//
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

// POST Crear un nuevo producto
server.post('/producto_nuevo', validarBodyProducto, (req, res) => {
  Producto.create({
    nombre: req.body.nombre,
    precio: req.body.precio,
    activo: req.body.activo,
    imagen: req.body.imagen
  }).then(producto => {
    res.status(200).json({ producto });
  }).catch(error => {
    res.status(400).json({ error: error.message });
  })
});

// Consultar todos los productos
server.get('/productos', (req, res) => {
  Producto.findAll().then(productos => {
    res.json(productos);
  }).catch(error => {
    res.send(error.message);
  })
})

//Actualizar producto
server.put('/producto_act/:id', (req, res) => {
  Producto.forEach((producto) => {
    if (producto.id == req.params.id) {
      producto.nombre = req.body.nombre;
      producto.precio = req.body.precio;
      producto.activo = req.body.activo;
      producto.imagen = req.body.imagen;
    }
  });
  res.status(200).json({});
});

//====================Usuarios ================//

// validación body login
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


// validación body register
/*const validarBodyRegister = (req, res, next) => {
  if (
    !req.body.usuario ||
    !req.body.nombre ||
    !req.body.correo ||
    !req.body.telefono ||
    !req.body.direccion ||
    !req.body.contrasena
  ) {
    res.status(400).json({
      error: "debe registrarse con los datos completos",
    });
  } else {
    next();
  }
};*/

// validación de usuario en DB (validar nombre y mail por separado)
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

const validarUsuarioCorreo = async (req, res, next) => {
  const usuarioExistente = await Usuario.findOne({
    where: {
      correo: req.body.correo
    }
  });

  if (usuarioExistente) {
    res.status(409).json({ error: `Ya existe una cuenta registrada con el correo  correo` });
  } else {
    next();
  }
}


server.post('/login', validarBodyLogin, verificarLogin, (req, res) => {
  const token = jwt.sign(
      {
          usuario: req.body.usuario,
          correo: req.body.correo,
      },
      secretJWT,
      { expiresIn: "60m" }
  );
  res.status(200).json({ token });
});



// GET Usuarios
server.get('/usuarios', (req, res) => {
  Usuario.findAll(
    {
      include:[{
        model:Roles,
        as:"permiso",
        attributes:[
          'id','nombre'
        ]
      }],
      attributes:['id','usuario','nombre','correo','telefono','direccion']
    }
  ).then(usuarios => {
      res.json(usuarios);
  }).catch(error => {
      res.send(error.message);
  })
})

server.post('/register', validarUsuarioCorreo, validarUsuarioNombre, (req, res) => {
  Usuario.create({
      usuario: req.body.usuario,
      nombre:req.body.nombre,
      correo: req.body.correo,
      telefono: req.body.telefono,
      direccion:req.body.direccion,
      contrasena: req.body.contrasena
  }).then(usuario => {
      res.status(200).json({ usuario });
  }).catch(error => {
      res.status(400).json({ error: error.message });
  });
})

//=============================================Fin endpoint Usuarios===================================== 



server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);

  // Conectarse a la base de datos cuando levanta el servidor
  // force true: DROP TABLES (no queremos que reinicie las tablas constantemente!)
  db.sync({ force: true}).then(() => {
    console.log("Succesfully connected to database");
  }).catch(error => {
    console.log("Se ha producido un error: " + error);
  });
});