USE `full-stack-szumilasapp`;

SET foreign_key_checks = 0;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` smallint unsigned NOT NULL primary key,
  `code` varchar(3) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
);

--
-- Data for table `country`
--

INSERT INTO `country` VALUES 
(1,'PLN','Polska'),
(2,'CZ','Czechy'),
(3,'DE','Niemcy'),
(4,'GBR','Wielka Brytania');
