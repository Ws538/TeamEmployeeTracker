const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "happypass2012",
    database: "team_db",
  },
  console.log("Welcome to Team Employee Tracker")
);

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
      }
    });
};

function showAllDepartments() {
  db.query("SELECT * FROM departments;", function (err, results) {
    console.table(results);
    initPrompt();
  });
}

function showAllRoles() {
  db.query(
    "SELECT roles.id AS id, roles.title AS title, departments.name AS department, roles.salary AS salary FROM roles JOIN departments ON roles.departments_id = departments.id;",
    function (err, results) {
      console.table(results);
      initPrompt();
    }
  );
}

function showAllEmployees() {
  db.query(
    "SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary FROM employee JOIN roles JOIN departments ON employee.roles_id = roles.id WHERE roles.departments_id = departments.id;",
    function (err, results) {
      console.table(results);
      initPrompt();
    }
  );
}

initPrompt();
