-- -----------------------------------------------------
-- Schema full-stack-szumilasapp
-- -----------------------------------------------------

USE `full-stack-szumilasapp`;

--
-- Prep work
--
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `full-stack-szumilasapp`.`images`;

SET FOREIGN_KEY_CHECKS=1;

--
-- Table structure for table `full-stack-szumilasapp`.`images`
--
CREATE TABLE `full-stack-szumilasapp`.`images`(
  `id` bigint NOT NULL primary key auto_increment,
  `url` varchar(255) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL
);

alter table images add foreign key (product_id) references product(id);
