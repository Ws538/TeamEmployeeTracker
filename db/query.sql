-- view all departments
SELECT * FROM departments;

-- view all roles
SELECT roles.id AS id, roles.title AS title, departments.name AS department, roles.salary AS salary FROM roles JOIN departments ON roles.departments_id = departments.id;

-- view all Employees
SELECT employee.id AS id, 
employee.first_name AS first_name, 
employee.last_name AS last_name, 
roles.title AS title, 
departments.name AS department, 
roles.salary AS salary, 
employee.manager_id AS manager_id
FROM employee JOIN roles JOIN departments 
ON employee.roles_id = roles.id WHERE roles.departments_id = departments.id;


