-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-07-2021 a las 17:23:25
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `precio_total` double NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('NUEVO','PREPARANDO','CONFIRMADO','ENVIANDO','CANCELADO','ENTREGADO') NOT NULL DEFAULT 'NUEVO',
  `formas_pago` enum('TC','CASH','PSE','PAYPAL','MP') NOT NULL,
  `usuarios_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `precio_total`, `fecha`, `estado`, `formas_pago`, `usuarios_id`) VALUES
(6, 210, '2021-07-11 20:52:56', 'CONFIRMADO', 'CASH', 7),
(11, 210, '2021-07-11 21:27:45', 'NUEVO', 'CASH', 7),
(13, 65, '2021-07-12 02:23:10', 'NUEVO', 'TC', 5),
(14, 65, '2021-07-12 02:24:24', 'NUEVO', 'TC', 5),
(16, 65, '2021-07-12 02:47:33', 'NUEVO', 'TC', 5),
(17, 65, '2021-07-12 03:03:05', 'NUEVO', 'TC', 5),
(29, 65, '2021-07-12 03:53:19', 'NUEVO', 'PAYPAL', 5),
(30, 65, '2021-07-12 14:15:00', 'NUEVO', 'PAYPAL', 5),
(31, 65, '2021-07-12 15:13:32', 'NUEVO', 'PAYPAL', 5),
(32, 65, '2021-07-12 15:20:32', 'NUEVO', 'PSE', 5),
(33, 65, '2021-07-12 15:30:50', 'NUEVO', 'PSE', 5),
(34, 65, '2021-07-12 15:43:21', 'NUEVO', 'PSE', 5),
(36, 65, '2021-07-12 18:53:30', 'NUEVO', 'PSE', 5),
(37, 41, '2021-07-16 14:18:33', 'NUEVO', 'PSE', 2),
(38, 41, '2021-07-16 14:18:37', 'NUEVO', 'PSE', 2),
(39, 41, '2021-07-16 14:18:38', 'NUEVO', 'PSE', 2),
(40, 41, '2021-07-16 14:18:39', 'NUEVO', 'PSE', 2),
(41, 41, '2021-07-16 14:18:40', 'NUEVO', 'PSE', 2),
(42, 41, '2021-07-16 14:18:41', 'NUEVO', 'PSE', 2),
(43, 41, '2021-07-16 14:18:42', 'NUEVO', 'PSE', 2),
(44, 41, '2021-07-16 14:23:57', 'NUEVO', 'PSE', 2),
(45, 41, '2021-07-16 14:40:08', 'NUEVO', 'PSE', 2),
(46, 41, '2021-07-16 14:43:31', 'NUEVO', 'PSE', 2),
(47, 215, '2021-07-16 14:56:42', 'NUEVO', 'PSE', 8),
(48, 215, '2021-07-16 15:01:11', 'NUEVO', 'PSE', 8),
(49, 215, '2021-07-16 15:04:55', 'NUEVO', 'PSE', 8),
(50, 215, '2021-07-16 15:06:36', 'NUEVO', 'PSE', 8),
(51, 215, '2021-07-16 15:07:39', 'NUEVO', 'PSE', 8),
(52, 215, '2021-07-16 15:08:44', 'NUEVO', 'PSE', 8),
(53, 215, '2021-07-16 15:09:08', 'NUEVO', 'PSE', 8),
(54, 215, '2021-07-16 15:09:16', 'NUEVO', 'PSE', 8),
(55, 215, '2021-07-16 15:09:22', 'NUEVO', 'PSE', 8),
(56, 215, '2021-07-16 15:09:29', 'NUEVO', 'PSE', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_has_productos`
--

CREATE TABLE `pedidos_has_productos` (
  `pedidos_id` int(11) NOT NULL,
  `productos_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedidos_has_productos`
--

INSERT INTO `pedidos_has_productos` (`pedidos_id`, `productos_id`, `cantidad`) VALUES
(52, 5, 3),
(52, 9, 5),
(53, 5, 3),
(53, 9, 5),
(54, 5, 3),
(54, 9, 5),
(55, 5, 3),
(55, 9, 5),
(56, 5, 3),
(56, 9, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `precio` double NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `activo`, `imagen`) VALUES
(1, 'Fritanga o Picada', 230, 1, 'https://tipsparatuviaje.com/wp-content/uploads/2019/07/fritanga-o-picada-1.jpg'),
(2, 'Rondón', 11, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Comida-t%C3%ADpica-colombiana-Rond%C3%B3n.jpg'),
(3, 'Mondongo Colombiano', 12, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Comida-t%C3%ADpica-de-Colombia-Mondongo.jpg'),
(4, 'Empanadas', 6, 1, 'https://viajerocasual.com/wp-content/uploads/2019/05/empanadas-colombianas.jpg'),
(5, 'Bandeja paisa', 30, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Comida-t%C3%ADpica-de-Colombia-Bandeja-Paisa.jpg'),
(6, 'Ajiaco', 30, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Platos-t%C3%ADpicos-de-Colombia-Ajiaco.jpg'),
(7, 'Lechona', 30, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Gastronom%C3%ADa-colombiana-lechona-rellena.jpg'),
(8, 'Changua', 10, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Comida-t%C3%ADpica-colombiana-Changua.jpg'),
(9, 'Sancocho', 25, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Comida-t%C3%ADpica-de-Colombia-Sancocho.jpg'),
(10, 'Arepas', 5, 1, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Platos-t%C3%ADpicos-de-Colombia-Arepa.jpg'),
(11, 'Tamales', 5, 0, 'https://elviajerofeliz.com/wp-content/uploads/2020/01/Gastronom%C3%ADa-colombiana-Tamales.jpg'),
(12, 'Fritanga o Picada', 230, 1, 'https://tipsparatuviaje.com/wp-content/uploads/2019/07/fritanga-o-picada-1.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'admin'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `nombre` varchar(500) NOT NULL,
  `correo` varchar(500) NOT NULL,
  `telefono` varchar(300) NOT NULL,
  `direccion` varchar(500) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `rols_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `correo`, `telefono`, `direccion`, `contrasena`, `rols_id`) VALUES
(1, 'japo91', 'Javier', 'javier@gmail.com', '3127543212', 'calle 13 57 50', 'javier123', 1),
(2, 'caso12', 'camilo', 'camilo@gmail.com', '3124524312', 'calle 67 21 26', 'camilo123', 2),
(5, 'vane200', 'vanessa', 'jsha@gmail.com', '314231232', 'Calle 23 23 12', 'U5uar10', 1),
(6, 'carlos3', 'carlos alberto', 'carlos@gmail.com', '314231232', 'Calle 23 23 12', 'AZLSKre$', 2),
(7, 'ebris202', 'Ebriana', 'ebriana@gmail.com', '314231232', 'Calle 23 23 12', 'U5uar10', 2),
(8, 'fulanito', 'August', 'august@gmail.com', '314231232', 'Calle 23 23 12', 'aug10', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedidos_usuarios_idx` (`usuarios_id`);

--
-- Indices de la tabla `pedidos_has_productos`
--
ALTER TABLE `pedidos_has_productos`
  ADD PRIMARY KEY (`pedidos_id`,`productos_id`),
  ADD KEY `fk_pedidos_has_productos_productos1_idx` (`productos_id`),
  ADD KEY `fk_pedidos_has_productos_pedidos1_idx` (`pedidos_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuarios_rols1_idx` (`rols_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `fk_pedidos_usuarios` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedidos_has_productos`
--
ALTER TABLE `pedidos_has_productos`
  ADD CONSTRAINT `fk_pedidos_has_productos_pedidos1` FOREIGN KEY (`pedidos_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pedidos_has_productos_productos1` FOREIGN KEY (`productos_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_rols1` FOREIGN KEY (`rols_id`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
