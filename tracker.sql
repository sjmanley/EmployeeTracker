DROP DATABASE IF EXISTS tracker_db;

CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
  id INTEGER (10) AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
  );
  CREATE TABLE role (
  id INTEGER (10),
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  role_id INTEGER
  );
  CREATE TABLE employee (
  id INTEGER (10),
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30),
  employee_id VARCHAR(30),
  manager_id INTEGER
  );
  