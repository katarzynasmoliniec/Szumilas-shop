-- -----------------------------------------------------
-- Schema full-stack-szumilasapp
-- -----------------------------------------------------

USE `full-stack-szumilasapp`;

--
-- Prep work
--
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `order_item`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `address`;
SET FOREIGN_KEY_CHECKS=1;

--
-- Table structure for table `address`
--
CREATE TABLE `address` (
  `id` bigint NOT NULL primary key auto_increment,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL
);

--
-- Table structure for table `customer`
--
CREATE TABLE `customer` (
  `id` bigint NOT NULL primary key auto_increment,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
);
alter table customer add UNIQUE (email);

--
-- Table structure for table `orders`
--
CREATE TABLE `orders` (
  `id` bigint NOT NULL primary key auto_increment,
  `order_tracking_number` varchar(255) DEFAULT NULL,
  `total_price` decimal(19,2) DEFAULT NULL,
  `total_quantity` int DEFAULT NULL,
  `billing_address_id` bigint DEFAULT NULL UNIQUE,
  `customer_id` bigint DEFAULT NULL,
  `shipping_address_id` bigint DEFAULT NULL UNIQUE,
  `status` varchar(128) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `last_updated` datetime(6) DEFAULT NULL
);

alter table orders add foreign key (customer_id) references customer (id);
alter table orders add foreign key (billing_address_id) references address (id);
alter table orders add foreign key (shipping_address_id) references address (id);

--
-- Table structure for table `order_items`
--
CREATE TABLE `order_item` (
  `id` bigint NOT NULL primary key auto_increment,
  `image_url` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit_price` decimal(19,2) DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL
);

alter table order_item add foreign key (order_id) references orders (id);
alter table order_item add foreign key (product_id) references product (id);
