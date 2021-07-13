const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

//como se guarda en variables de entorno
//const secretJWT = "escribiralgomuyseguro1234-lbjnwef89h234234rbhjui";
const db = require('./database');
//require('./database/asociations');
require('dotenv').config();

const server = express();
const APP_PORT = process.env.APP_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
// instanciar modelos
const { Producto, Pedido, Usuario, Roles, Pedidos_has_productos } = require("./database/models");

// instanciar validaciones 
const { ValidoAdmon, validarBodyProducto, validarBodyLogin, verificarLogin, validarUsuarioNombre, validarUsuarioCorreo,validarEstadoPedido } = require("./validations");

// middlewares
server.use(helmet());
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(
  expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/login", "/register"]
  })
);


/* ==================== Endpoint usuarios ===================
=========================================================================
*/

//POST login de usuarios
server.post('/login', validarBodyLogin, verificarLogin, (req, res) => {
  const token = jwt.sign(
    {
      usuario: req.body.usuario,
      correo: req.body.correo,
    },
    JWT_SECRET,
    { expiresIn: "60m" }
  );
  res.status(200).json({ token });
});



// GET consulta de Usuarios
server.get('/usuarios', ValidoAdmon, (req, res) => {
  Usuario.findAll(
    {
      include: [{
        model: Roles,
        as: "permiso",
        attributes: [
          'id', 'nombre'
        ]
      }],
      attributes: ['id', 'usuario', 'nombre', 'correo', 'telefono', 'direccion']
    }
  ).then(usuarios => {
    res.json(usuarios);
  }).catch(error => {
    res.send(error.message);
  })
})


//Post registro de nuevos usuarios 
server.post('/register', validarUsuarioCorreo, validarUsuarioNombre, (req, res) => {
  Usuario.create({
    usuario: req.body.usuario,
    nombre: req.body.nombre,
    correo: req.body.correo,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    contrasena: req.body.contrasena
  }).then(usuario => {
    res.status(200).json({ usuario });
  }).catch(error => {
    res.status(400).json({ error: error.message });
  });
})



/* ====================== Endpoint productos =========================
=========================================================================
*/

// POST Crear un nuevo producto
server.post('/producto_nuevo', validarBodyProducto, ValidoAdmon, (req, res) => {
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

// GET Consultar todos los productos
server.get('/productos', (req, res) => {
  Producto.findAll().then(productos => {
    res.json(productos);
  }).catch(error => {
    res.send(error.message);
  })
})

//PUT Actualizar producto
server.put('/productos/:id', ValidoAdmon, (req, res) => {
  Producto.update({
    nombre: req.body.nombre,
    precio: req.body.precio,
    activo: req.body.activo,
    imagen: req.body.imagen
  }, {
    where: { id: req.params.id }
  }).then(product => {
    res.status(200).json({ product });
  }).catch(error => {
    res.send(error.message);
  })
});

//DELETE eliminar producto, solo es un borrado lógico en donde 1 es activo y 0 es inactivo
server.put('/productos/borrar/:id', ValidoAdmon, (req, res) => {
  Producto.update({
    activo: 0,
  }, {
    where: { id: req.params.id }
  }).then(product => {
    res.status(200).json({product});
  }).catch(error => {
    res.send(error.message);
  })
});


/* ====================== Endpoint pedidos ===========================
=========================================================================
*/

server.post('/NuevoPedido', async (req, res) => {
  const { formas_pago, platos, usuarios_id } = req.body;
  //Se completa los datos del plato con el precio 
  const PlatosSolicitados = await Promise.all(
    platos.map(async (plato) => {
      const detallePlato = await Producto.findByPk(plato.id);
      return {
        cantidad: plato.cantidad,
        precio: detallePlato.precio,
        id: plato.id
      };
    })
  );

  //Se totaliza el valor del pedido sumando los platos
  //const precio_total=PlatosSolicitados.reduce((nuevo, platos)=>{
  //  return (nuevo+=parseFloat(platos.precio)*parseFloat(platos.cantidad));
  //})

  let precio_total = 0;

  PlatosSolicitados.forEach((prod) => {
    precio_total += parseFloat(prod.precio) * parseFloat(prod.cantidad);
  });

  // Se crea el pedido con los datos antes obtenidos
  const NuevoPedido = await Pedido.create({
    precio_total,
    fecha: Date.now(),
    formas_pago: formas_pago,
    usuarios_id: usuarios_id
  }).then(p => {
    res.json(p);
  }).catch(error => {
    res.send(error.message);
  });


  res.json(NuevoPedido);
  //Se crea el registro en la tabla intermedia 
  await Promise.all(
    PlatosSolicitados.map(async (prod) => {
      const p = await Pedidos_has_productos.create(
        {
          pedidos_id: NuevoPedido.id,
          productos_id: prod.id,
          cantidad: prod.cantidad
        },
        {
          fields: ['pedidos_id', 'productos_id', 'cantidad'],
        }
      );
      console.log(p);
    })
  );
});

//Actualizar estado del pedido
server.put('/pedido/:id', ValidoAdmon, validarEstadoPedido, (req, res) => {
  Pedido.update({
    estado: req.body.estado
  }, {
    where: { id: req.params.id }
  }).then(ped => {
    res.status(200).json({ ped });
  }).catch(error => {
    res.send(error.message);
  })
});



server.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);

  // Conectarse a la base de datos cuando levanta el servidor
  // force true: DROP TABLES (no queremos que reinicie las tablas constantemente!)
  db.sync({ force: false }).then(() => {
    console.log("Succesfully connected to database");
  }).catch(error => {
    console.log("Se ha producido un error: " + error);
  });
});