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
      connection.query(`SELECT * FROM department WHERE name = "${answer.choices}"`, function (err, res) {
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
      connection.query(`SELECT * FROM role WHERE name = "${answer.choices}"`, function (err, res) {
        if (err) throw err
        console.table(res)
        runSearch()
      })
    })
}