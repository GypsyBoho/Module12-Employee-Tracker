USE employee_db;
SELECT * FROM department;
-- LEFT JOIN means give me all the rows as they are for the primary table. The secondary table is the one that maps the foreign key to the actual description --
SELECT role.id, role_title AS title, department_name AS department, role_salary AS salary
FROM role LEFT JOIN department ON role.department_id = department.id;

SELECT employee.first_name, employee.last_name AS employee_name, role_id AS role, manager_id AS is not NULL
FROM employee LEFT JOIN employee ON employee.manager_id = manager.id; 
-- SELECT id, department_name AS Department FROM department

-- FROM role LEFT JOIN department ON role.department_id = department.id;

-- primary table is employee --
-- inquire.prompt  index.js--

