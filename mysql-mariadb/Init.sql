/*
    mysql/mariadb init statements
*/
CREATE DATABASE IF NOT EXISTS tetris;
USE tetris;
CREATE TABLE IF NOT EXISTS score
(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    score INT
);
