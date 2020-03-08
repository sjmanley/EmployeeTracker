const mysql = require('mysql')
const inquirer = require('inquirer')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'tracker_db',
  password: 'C00per123!'
})

connection.connect(function (err) {
  if (err) throw err
  runSearch()
})

function runSearch() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choices',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View Department',
        'View Employee by Role',
        'Delete Employee',
        'Add Employee',
        'EXIT']

    })
    .then(function (answer) {
      console.log(answer)
      switch (answer.choices) {
        case 'View All Employees':
          employeeSearch()
          break

        case 'View Department':
          departmentSearch()
          break

        case 'View Role':
          roleSearch()
          break

        case 'Delete Employee':
          departmentSearch()
          break

        case 'Add Employee':
          departmentSearch()
          break

        case 'exit':
          connection.end()
          break
      }
    })
}

function employeeSearch() {
  var query = 'SELECT * FROM employee'
  connection.query(query, function (err, res) {
    if (err) throw err
    console.table(res)
    runSearch()
  })
}

function viewDepartment() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err
    console.table(res)
    runSearch()
  })
}

function departmentSearch() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choices',
      message: 'View Department?',
      choices: ['Human Resources',
        'Marketing Department',
        'Graphics Department',
        'IT Department']
    })
    .then(function (answer) {
      connection.query(`SELECT * FROM department WHERE name = '${answer.choices}'`, function (err, res) {
        if (err) throw err
        console.table(res)
        runSearch()
      })
    })
}

function viewRole() {
  connection.query('SELECT * FROM role', function (err, res) {
    if (err) throw err
    console.table(res)
    runSearch()
  })
}

function roleSearch() {
  inquirer
    .prompt({
      type: 'list',
      name: 'choices',
      message: 'View Role?',
      choices: ['Supervisor',
        'Manager',
        'Director',
        'Creative']
    })
    .then(function (answer) {
      connection.query(`SELECT * FROM role WHERE name = '${answer.choices}'`, function (err, res) {
        if (err) throw err
        console.table(res)
        runSearch()
      })
    })
    
  const addEmployee = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'First name of new employee?',
          name: 'first_name'
        },
        {
          type: 'input',
          message: 'Last name of new employee?',
          name: 'last_name'
        },

        {
          type: 'number',
          message: 'ID of new employee?',
          name: 'employee_id'
        },
        {
          type: 'number',
          message: 'Manager ID of new employee?',
          name: 'manager_id'
        }
      ])
      .then(answer => {
        const query = `INSERT INTO employee (first_name, last_name,employee_id, manager_id) VALUE ('${answer.first_name}' '${answer.last_name}' '${answer.employee_id}' '${answer.manager_id}')`
        connection.query(query, function (err, res) {
          if (err) throw err
          console.table(res)
          run()
        })
      })
  }

  const employeeRole = () => {

    connection.query('SELECT * FROM employee', function (err, res) {
      if (err) throw err
      console.table(res)
      inquirer
        .prompt([
          {
            type: 'Number',
            message: 'ID of employee you would like to update?',
            name: 'id'
          },
          {
            type: 'number',
            message: 'What new role ID are you assigning the employee?',
            name: 'role_id'
          }
        ]).then(answer => {
          const query = `UPDATE employee SET role_id = '${answer.role_id}' WHERE id = ${answer.id}`
          connection.query(query, function (err, res) {
            if (err) throw err
            console.log('Role updated.')
            run()
          })
        })
    })
  }
  const deleteEmployee = () => {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Employee first name?',
          name: 'first_name'
        },
        {
          type: 'input',
          message: 'Employee last name?',
          name: 'last_name'
        },

        {
          type: 'number',
          message: 'Employee role ID?',
          name: 'employee_id'
        },
        {
          type: 'number',
          message: 'Manager ID of the employee?',
          name: 'manager_id'
        }
      ])

      .then(answer => {
        const query = `DELETE FROM employee WHERE(first_name, last_name, salary, employee_id, manager_id) =('${answer.first_name}' '${answer.last_name}' '${answer.salary}' '${answer.role_id}' '${answer.manager_id}')`
        connection.query(query, function (err, res) {
          if (err) throw err
          console.table(res)
          run()
        })
      })
  };
}