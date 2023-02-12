INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineers"),
       ("Finance"),
       ("Legal");
       
INSERT INTO roles (title, salary, departments_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 180000, 2),
       ("Software Engineer", 120000, 2),
       ("Acoount Manager", 150000, 3),
       ("Accountant", 100000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 180000, 4);
       
INSERT INTO employee (first_name, last_name, roles_id)
VALUES ("William", "Su", 1),
       ("John", "Smith", 2),
       ("Karen", "Han", 3),
       ("Sam", "Smith", 4),
       ("Tony", "Parker", 5),
       ("Harry", "Potter", 6),
       ("Tommy", "Wu", 7),
       ("Anthony", "Jones", 8);

ALTER TABLE `employee` ADD COLUMN `manager_id` INT;

UPDATE `employee` SET `manager_id` = 1 WHERE `roles_id` = 2;
UPDATE `employee` SET `manager_id` = 3 WHERE `roles_id` = 4;
UPDATE `employee` SET `manager_id` = 5 WHERE `roles_id` = 6;
UPDATE `employee` SET `manager_id` = 7 WHERE `roles_id` = 8;  


 