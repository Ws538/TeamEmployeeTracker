const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection(
  {
    host: "127.0.0.1",
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
    // "SELECT * FROM roles",
    function (err, results) {
      console.table(results);
      initPrompt();
    }
  );
}

function showAllEmployees() {
  connection.query(
    "SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, employee.manager_id AS manager_id FROM employee JOIN roles JOIN departments ON employee.roles_id = roles.id WHERE roles.departments_id = departments.id;",
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
  connection.query(`SELECT * FROM departments`, (err, results) => {
    inquirer
      .prompt([
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
          choices: function () {
            let choiceArr = Array.from(
              results.map((choice) => {
                return {
                  name: choice.name,
                  value: choice.id,
                };
              })
            );
            return choiceArr;
          },
          message: "Choose the department for the new title?",
        },
      ])
      .then((answers) => {
        connection.query(
          `INSERT INTO roles(title, salary, departments_id) 
          VALUES("${answers.title}",
          "${answers.salary}","${answers.department}");`,
          (err, results) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(answers);
            initPrompt();
          }
        );
      });
  });
};

const addEmployee = () => {
  connection.query(
    `SELECT roles.id AS id, roles.title AS title, employee.id, employee.first_name, employee.last_name
     FROM roles
     JOIN employee ON roles.id = employee.roles_id`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      inquirer
        .prompt([
          {
            name: "fName",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role",
            type: "list",
            choices: function () {
              let roleChoices = results.map((role) => {
                return {
                  name: role.title,
                  value: role.id,
                };
              });
              return roleChoices;
            },
            message: "What role will the employee have?",
          },
          {
            name: "manager",
            type: "list",
            choices: function () {
              let managerChoices = results.map((employee) => {
                return {
                  name: `${employee.first_name} ${employee.last_name}`,
                  value: employee.manager_id,
                };
              });
              return managerChoices;
            },
            message: "Who will be the employee's manager?",
          },
        ])
        .then((answers) => {
          connection.query(
            `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
            VALUES (?, ?, ?, ?)`,
            [answers.fName, answers.lName, answers.role, answers.manager],
            (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(
                `Successfully added employee: ${answers.fName} ${answers.lName}`
              );
              initPrompt();
            }
          );
        });
    }
  );
};

const updateEmployeeRole = () => {
  connection.query(
    `SELECT employee.id ,employee.first_name, employee.last_name, roles.title AS roles, roles.id AS roles_id FROM employee JOIN roles ON employee.roles_id = roles.id`,
    (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      inquirer.prompt([
        {
          name: "name",
          type: "list",
          choices: function () {
            let employeeChoices = results.map((employee) => {
              return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: { id: employee.id, name: `${employee.first_name} ${employee.last_name}` },
              };
            });
            return employeeChoices;
          },
          message: "What is the name of the employee?",
        },
        {
          name: "changeRole",
          type: "list",
          choices: function() {
            let roleChange = results.map((employee) => {
                return {
                  name: employee.roles,
                  value: employee.roles_id
                };             
            });
            return roleChange
          },
          message: "Which role do you want to assign the selected employee?",
        },
      ])
      .then((answers) => {
        console.log(answers)
        connection.query(`UPDATE employee SET roles_id = ${answers.changeRole} WHERE employee.id = ${answers.name.id}`,
 
        err, results => {
          if (err) {
            console.log(err);
            return;            
          }
          initPrompt()
        })
        
      })
    }
  );
};


