const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "happypass2012",
    database: "team_db",
  },
  console.log("Welcome to Team Employee Tracker")
);

connection.connect((err) => {
  if (err) throw err;
  initPrompt();
});

const initPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "initPrompt",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.initPrompt) {
        case "View All Departments":
          showAllDepartments();
          break;
        case "View All Roles":
          showAllRoles();
          break;
        case "View All Employees":
          showAllEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployeeRole();
          break;
      }
    });
};

function showAllDepartments() {
  connection.query("SELECT * FROM departments;", function (err, results) {
    console.table(results);
    initPrompt();
  });
}

function showAllRoles() {
  connection.query(
    "SELECT roles.id AS id, roles.title AS title, departments.name AS department, roles.salary AS salary FROM roles JOIN departments ON roles.departments_id = departments.id;",
    function (err, results) {
      console.table(results);
      initPrompt();
    }
  );
}

function showAllEmployees() {
  connection.query(
    "SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary FROM employee JOIN roles JOIN departments ON employee.roles_id = roles.id WHERE roles.departments_id = departments.id;",
    function (err, results) {
      console.table(results);
      initPrompt();
    }
  );
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the Department?",
      },
    ])
    .then((answers) => {
      connection.query(`INSERT INTO departments(name) VALUES(?)`, [
        answers.departmentName,
      ]);
      console.log(`Successfuly added Department "${answers.departmentName}"`);
      initPrompt();
    });
};

const addRole = () => {
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the new role title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the new salary for this role?",
      },
      {
        name: "department",
        type: "list",
        choice: function () {
            
          },
          message: "Choose the department for the new title?",
        },
    ])
    .then((answers) => {
        connection.query(`INSERT INTO roles(title, salary, department_id) VALUES("${answers.title}","${answers.salary}")`)
        console.log()
    })
  }
