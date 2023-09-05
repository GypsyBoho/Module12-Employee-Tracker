// import statements
const inquirer = require('inquirer');
const db = require("./connection")
require("console.table")



// create inquirer question and statement
function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'firstQuestion',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ]).then(answers => {
        if (answers.firstQuestion === "View All Employees") {
            viewAllEmployees();
        } else if (answers.firstQuestion === "View All Roles") {
            viewAllRoles();
        } else if (answers.firstQuestion === "View All Departments") {
            viewAllDepartments();
        } else if (answers.firstQuestion === "Add Employee") {
            addNewEmployee();
        } else if (answers.firstQuestion === "Update Employee Role") {
            updateEmployeeRole();
        } else if (answers.firstQuestion === "Add Department") {
            addNewDepartment();
        } else if (answers.firstQuestion === "Add Role") {
            addNewRole();
        } else if (answers.firstQuestion === "Quit") {
            console.log('Goodbye');
            process.exit(0);
        }
    });
}
init()


const followUpQuestions = {
    'Add Employee': [
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the employee\'s role?',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'What is the employee\'s manager?',
            choices: ['None', 'John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd'],
        },

    ],
    'Update Employee Role': [
        {
            type: 'list',
            name: 'selectEmployee',
            message: 'Which employee\'s role do you want to update?',
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen'],
        },
        {
            type: 'list',
            name: 'updateEmployeeRole',
            message: 'Which role do you want to assign the selected employee?',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
        },
    ],
    'Add Role': [
        {
            type: 'input',
            name: 'newRoleName',
            message: 'What is the name of the new role?',
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'What is the salary of the new role?',
        },
        {
            type: 'list',
            name: 'newRoleDepartment',
            message: 'What department do you want to assign the new role to?',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal']
        },

    ],
    'Add Department': [
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'What is the name of the new department?'
        },
    ],
};


async function viewAllEmployees() {
    const [allEmployees] = await db.promise().query("SELECT * FROM employee")
    console.table(allEmployees)
    init()
    // make a query of the database
    // display results
    // takes user back to the main menu
}
async function viewAllRoles() {
    const [allRoles] = await db.promise().query(`SELECT role.id, role_title AS title, department_name AS department, role_salary AS salary FROM role LEFT JOIN department ON role.department_id = department.id;`)
    console.table(allRoles)
    init()
}
async function viewAllDepartments() {
    const [allDepartments] = await db.promise().query("SELECT id, department_name AS Department FROM department")
    console.table(allDepartments)
    init()
}
async function addNewDepartment() {
    const response = await inquirer.prompt({ type: 'input', name: 'departmentName', message: 'What is the name of the new department?' });
    const department = await db.promise().query("Insert Into department (department_name) VALUES (?)", [response.departmentName]);
    console.log(`Added ${response.departmentName} to departments`)
    init()
}
async function addNewRole() {
    db.query('SELECT id value, department_name name FROM department', async(err, departmentData) => {
        const response = await inquirer.prompt([
            { type: 'input', name: 'roleTitle', message: 'What is the title of the new role?' },
            { type: 'input', name: 'roleSalary', message: 'What is the salary of the new role?' },
            { type: 'list', name: 'roleId', message: 'What department does this new role report to?', choices: departmentData },
        ]);
        const newRole = await db.promise().query("Insert into role (role_title, role_salary, department_id) VALUES(?, ?, ?)", [response.roleTitle, response.roleSalary, response.roleId]);
        const [allDepartments] = await db.promise().query("SELECT id, department_name AS Department FROM department")
        const departments = allDepartments.map(department => ({ name: department.Department, value: department.id }))
        console.log('Added ${response.roleTitle} role');
        init()
    })
}
async function addNewEmployee() {
    db.query('SELECT id value, role_title name FROM role', async (err, roleData) => {
        // console.log(roleData)
        db.query('SELECT id value, CONCAT(employee_first_name, " " ,employee_last_name) name FROM employee WHERE manager_id is NULL', async (err, managerData) => {
            // console.log(managerData)
            const response = await inquirer.prompt([
                { type: 'input', name: 'employeeFirstName', message: 'What is the employee\'s first name?' },
                { type: 'input', name: 'employeeLastName', message: 'What is the employee\'s last name?' },
                { type: 'list', name: 'employeeRole', message: 'What is the employee\'s role?', choices: roleData },
                { type: 'list', name: 'managerId', message: 'What is the employee\'s manager?', choices: managerData },
                { type: 'input', name: 'employeeSalary', message: 'What is the employee\'s salary?' },
            ]);
            const newEmployee = await db.promise().query("INSERT INTO employee (employee_first_name, employee_last_name, role_id, manager_id, employee_salary) VALUES(?, ?, ?, ?, ?)", [response.employeeFirstName, response.employeeLastName, response.employeeRole, response.managerId, response.employeeSalary]);
            const [allEmployees] = await db.promise().query("SELECT id, employee_first_name AS First_Name FROM employee")
            // const newEmployee = allEmployees.map(employeeFirstName => ({name: employee.firstName, value: employee.id })); 
            console.log(`Added ${response.employeeFirstName} to employees database`);
            init()
        });
    });
}
async function updateEmployeeRole() {
    db.query('SELECT id value, role_title name FROM role', async (err, roleData) => {
        // console.log(roleData)
        db.query('SELECT id value, CONCAT(employee_first_name, " " ,employee_last_name) name FROM employee', async (err, employeeData) => {
            // console.log(managerData)
            const response = await inquirer.prompt([
                { type: 'list', name: 'employeeRole', message: 'What is the employee\'s role?', choices: roleData },
                { type: 'list', name: 'employeeId', message: 'What employee do you want to update?', choices: employeeData }
            ]);
            const newEmployee = await db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [response.employeeRole, response.employeeId]);
            const [allEmployees] = await db.promise().query("SELECT id, employee_first_name AS First_Name FROM employee")
            // const newEmployee = allEmployees.map(employeeFirstName => ({name: employee.firstName, value: employee.id })); 
            console.log(`Updated ${response.employeeFirstName} role`);
            init()
        });
    });
}
async function updateEmployeeRole() {
    db.query('SELECT id value, role_title name FROM role', async (err, roleData) => {
        // console.log(roleData)
        db.query('SELECT id value, CONCAT(employee_first_name, " " ,employee_last_name) name FROM employee', async (err, employeeData) => {
            // console.log(managerData)
            const response = await inquirer.prompt([
                { type: 'list', name: 'employeeRole', message: 'What is the employee\'s role?', choices: roleData },
                { type: 'list', name: 'employeeId', message: 'What employee do you want to update?', choices: employeeData }
            ]);
            const newEmployee = await db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [response.employeeRole, response.employeeId]);
            const [allEmployees] = await db.promise().query("SELECT id, employee_first_name AS First_Name FROM employee")
            // const newEmployee = allEmployees.map(employeeFirstName => ({name: employee.firstName, value: employee.id })); 
            console.log(`Updated ${response.employeeFirstName} role`);
            init()
        });
    });
}



// make a query of the database
// display results
// takes user back to the main menu
// app.post('/api/new-movie', ({ body }, res) => {
//     const sql = `INSERT INTO movies (movie_name)
//       VALUES (?)`;
//     const params = [body.movie_name];

//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: body
//       });
//     });
//   });
// inquirer.prompt(mainQuestion).then(answer => {
//     const chosenAction = answer.action;
//     if (chosenAction === 'View All Employees') {
//         addNewEmployees.forEach(employee => {
//             console.log(`id: ${employee.id}, Name: ${employee.first_name} + ${employee.last_name}, Department: ${}`)
//         })
//     }
// })

// const response = await inquirer.prompt([{ type: 'input', name: 'title', message: 'What is the title of the new role?'}, {type: "input", name: 'salary', message: "What is the salary of the new title"}, {type: "list", name: "id", message: "What department does this role report to?", choices: departments}])
    // const newRole = await db.promise().query("Insert Into role (role_title, role_salary, department_id) VALUES (?, ?, ?)", [response.title, response.salary, response.id])
    // console.log(`Added ${response.title} role`)



// const addNewRole = () => {
    // ask name of role
    // ask salary for the role
    // query departments
    // only once I'm done querying the department, then proceed to the next step - might take half a second
    // ask department with list of choices
    // write new data to db

    // Query database
    // db.query('SELECT * FROM -----', function (err, results) {

    //     if (results) {
    //         results.forEach(function (-----) {
    //             console.log(-----)
    //         })
    //     }

    // });
    // return confirmation message
    // return to main menu

// use callback
// db_query is asynchronous
// node based app -- look at activity 12 under 12-sql
// we need to connect