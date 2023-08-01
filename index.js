// import statements
// create inquirer question and statement

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'classlist_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

// Query database
db.query('SELECT * FROM students', function (err, results) {

    if (results) {
        results.forEach(function (student) {
            console.log(student)
        })
    }

});

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
    //  make a query of the database
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
    db.query
    // return confirmation message
    // return to main menu
}

// use callback
// db_query is asynchronous
// node based app -- look at activity 12 under 12-sql
// we need to connect