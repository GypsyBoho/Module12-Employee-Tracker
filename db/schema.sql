-- DROP BD if it exists --
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL, -- foreign key --
    department_name VARCHAR(30) NOT NULL,
); 

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    role_title VARCHAR(30) NOT NULL,
    role_salary VARCHAR(30) NOT NULL
); 

CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT NOT NULL,
    manager_id INT AUTO_INCREMENT NOT NULL
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (customer_id)
    FOREIGN KEY (customer_id) 
    REFERENCES customers(id) 
    ON DELETE SET NULL,
);