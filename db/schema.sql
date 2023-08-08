-- DROP BD if it exists --
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
); 

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
); 

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id), 
);