// import statements
const inquirer = require('inquirer');
// create inquirer question and statement
const questions = [
    {
        type: 'list',
        name: 'firstQuestion',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
    {
        type: '',
        name: '',
        message: '',
        choices: []
    },
];
const followUpQuestions = {
    'Add Employee': [
        {
            type: 'input',
            name: 'employeeFirstName',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'employeeLastName',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is the employee\'s role?',
            choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'What is the employee\'s manager?',
            choices: ['None', 'John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd']
        },

    ]
}

inquirer.createPromptModule(questions).then(answers => {
    console.log('User input:', answers);
});

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the classlist_db database.`)
);


const viewAllEmployees = () => {
    // make a query of the database
    // display results
    // takes user back to the main menu
}

const addNewEmployees = () => {
    // make a query of the database
    // display results
    // takes user back to the main menu
}

const addNewDepartment = () => {
    // make a query of the database
    // display results
    // takes user back to the main menu
}

const addNewRole = () => {
    // ask name of role
    // ask salary for the role
    // query departments
    // only once I'm done querying the department, then proceed to the next step - might take half a second
    // ask department with list of choices
    // write new data to db

    // Query database
    db.query('SELECT * FROM -----', function (err, results) {
    
        if (results) {
            results.forEach(function (-----) {
                console.log(-----)
            })
        }
    
    });
    // return confirmation message
    // return to main menu
}

// use callback
// db_query is asynchronous
// node based app -- look at activity 12 under 12-sql
// we need to connect