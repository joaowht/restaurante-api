-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 24/11/2026 às 13:26
-- Versão do servidor: 8.4.7
-- Versão do PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `restaurante`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_usuario` int NOT NULL,
  `valor_total` int NOT NULL,
  `status` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `pedidos`
--

INSERT INTO `pedidos` (`ID`, `ID_usuario`, `valor_total`, `status`, `data`) VALUES
(2, 2, 43, 'Em preparo', '2026-11-17');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Descricao` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Preco` decimal(10,0) NOT NULL,
  `Categoria` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Disponivel` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`ID`, `Nome`, `Descricao`, `Preco`, `Categoria`, `Disponivel`) VALUES
(3, 'Strogonoff de Carne', 'Strogonoff de Carne feito com cogumelos japoneses feito por cozinheiro 5 estrelas, para duas pessoas', 89, 'Prato Principal', 1),
(2, 'Suco Natural de Maracujá', 'Suco natural de maracujá feito na hora.', 8, 'Bebidas', 1),
(4, 'Jack James', 'A melhor bebida da casa.', 60, 'Bebida Alcoólica', 1),
(5, 'Brisadeiro', 'Um chocolate que te leva para outro mundo', 9, 'Sobremesa', 1),
(6, 'Rouba brisa', 'A bebida que te faz delirar.', 10, 'Bebida Alcoólica', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Senha` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Tipo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`ID`, `Nome`, `Email`, `Senha`, `Tipo`) VALUES
(6, 'Gabriel Jesus', 'guaranajesus00@gmail.com', '$2b$10$JcwpWRHcuW6EZWgWkA/eNuiulFZzmoOULN6DCXERIsHL5ZWRdm6y2', 'cliente'),
(2, 'Yasmin', 'yasmin@gmail.com', 'senhasegura', 'cliente'),
(3, 'Gabriel', 'restaurante@gmail', '123456', 'restaurante'),
(4, 'Davi Santos', 'Davi@gmail', '$2b$10$WxN04VdEo/exJizs1XVRpe3V0rv3emUIzcZH6niQLg5jdyaPgSBvW', 'cliente'),
(5, 'Jorge', 'restaurante@gmail.com', '$2b$10$Q6Rw3xA60zdk46LVE06ZpOYIBYBpvEiRXZNYnoAmOI7jjgQG1Jg92', 'restaurante');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
