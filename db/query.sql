-- view all departments
SELECT * FROM departments;

-- view all roles
SELECT roles.id AS id, 
roles.title AS name, 
departments.name AS department, 
roles.salary AS salary
FROM roles JOIN departments 
ON roles.departments_id = departments.id;

-- view all Employees
SELECT roles.id AS id, 
roles.title AS name, 
departments.name AS department, 
roles.salary AS salary
FROM roles JOIN departments 
ON roles.departments_id = departments.id;