-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2024 a las 13:02:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inprocode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(6) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `color` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `start`, `end`, `color`) VALUES
(1, 'Technology Conference', 'A conference about the latest trends in technology', '2024-11-20 09:00:00', '2024-11-20 12:00:00', '#FF5733'),
(2, 'Jazz Concert', 'A live music concert in the park.', '2024-11-25 18:00:00', '2024-11-25 21:00:00', '#4CAF50'),
(3, 'Annual Marathon', 'A sporting event with various endurance races.', '2024-12-05 07:00:00', '2024-12-05 14:00:00', '#FF9800'),
(4, 'New Year\'s Eve Party', 'A celebration to welcome the new year.', '2024-12-31 22:00:00', '2025-01-01 05:00:00', '#9C27B0'),
(5, 'Project Meeting', 'Meeting to define the strategy for the new project', '2024-11-10 10:00:00', '2024-11-10 12:00:00', '#2196F3'),
(9, 'Japan Cooking Party', 'A good Cooking Event!', '2024-11-14 13:00:00', '2024-11-16 00:00:00', '#a484f1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locations`
--

CREATE TABLE `locations` (
  `id` int(6) NOT NULL,
  `name` varchar(30) NOT NULL,
  `latitude` decimal(11,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `category` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locations`
--

INSERT INTO `locations` (`id`, `name`, `latitude`, `longitude`, `category`) VALUES
(1, 'Cooking Class Gracia', 41.40231400, 2.16190800, 'Cooking'),
(2, 'Art Workshop Eixample', 41.38701500, 2.17004700, 'Art'),
(3, 'Hiking Point Montjuïc', 41.36403400, 2.16200800, 'Nature'),
(4, 'Gaming Lounge Gothic', 41.38199100, 2.17881000, 'Videogames'),
(5, 'Gastronomy Experience Raval', 41.38062000, 2.16928900, 'Cooking'),
(6, 'Art Center Poble Sec', 41.37168800, 2.16675300, 'Art'),
(7, 'Park Güell Nature Walk', 41.41449400, 2.15269400, 'Nature'),
(8, 'VR Arcade Sant Antoni', 41.37521800, 2.16224400, 'Videogames'),
(9, 'Mediterranean Cooking Poblenou', 41.39851500, 2.20343400, 'Cooking'),
(10, 'Digital Art Studio El Born', 41.38583000, 2.18154000, 'Art');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `num_visits`
--

CREATE TABLE `num_visits` (
  `id` int(11) NOT NULL,
  `month` varchar(20) NOT NULL,
  `year` int(11) NOT NULL,
  `visits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `num_visits`
--

INSERT INTO `num_visits` (`id`, `month`, `year`, `visits`) VALUES
(1, 'January', 2023, 1200),
(2, 'February', 2023, 1300),
(3, 'March', 2023, 1100),
(4, 'April', 2023, 1400),
(5, 'May', 2023, 1300),
(6, 'June', 2023, 1500),
(7, 'July', 2023, 1700),
(8, 'August', 2023, 1800),
(9, 'September', 2023, 1600),
(10, 'October', 2023, 1750),
(11, 'November', 2023, 1900),
(12, 'December', 2023, 2100),
(13, 'January', 2024, 1250),
(14, 'February', 2024, 1350),
(15, 'March', 2024, 1150),
(16, 'April', 2024, 1450),
(17, 'May', 2024, 1650),
(18, 'June', 2024, 1550),
(19, 'July', 2024, 2000),
(20, 'August', 2024, 1700),
(21, 'September', 2024, 1650),
(22, 'October', 2024, 2100),
(23, 'November', 2024, 1950),
(24, 'December', 2024, 2200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `first` varchar(20) NOT NULL,
  `last` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `hobby` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first`, `last`, `email`, `phone`, `location`, `hobby`) VALUES
(1, 'Laura', 'Montoya', 'laura.montoya@gmail.', 675212121, 'Barcelona', 'Photography'),
(4, 'John', 'Doe', 'john.doe@example.com', 1234567890, 'New York', 'Nature'),
(9, 'Laura', 'Perez', 'laura.perez@gmail.co', 1234564545, 'Valencia', ''),
(10, 'Inés', 'Brown', 'inesbrown@yahoo.es', NULL, 'London', 'Cooking'),
(14, 'John', 'Smith', 'smith.joe@gmail.com', 666542323, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `num_visits`
--
ALTER TABLE `num_visits`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `num_visits`
--
ALTER TABLE `num_visits`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
