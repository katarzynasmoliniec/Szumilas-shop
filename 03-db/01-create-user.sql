CREATE USER 'szumilasapp'@'localhost' IDENTIFIED BY 'szumilasapp';
GRANT ALL PRIVILEGES ON * . * TO 'szumilasapp'@'localhost';
ALTER USER 'szumilasapp'@'localhost' IDENTIFIED WITH mysql_native_password BY 'szumilasapp';