USE tracker_db;

INSERT INTO department (name)
  VALUE ("Human Resources"),
		("Marketing Department"),
        ("Graphics Department"),
        ("IT Department");
        
        
 INSERT INTO role (title, salary, role_id)
  VALUE ("Supervisor", 150000, 1),
		("Manager", 100000, 21),
        ("Director", 90000, 35),
        ("Creative", 60000, 46);
        
        
INSERT INTO employee (first_name, last_name, employee_id, manager_id)
  VALUE ("Scott", "Manley", 1, 33),
		("Chad", "Brunner", 21, 65),
        ("Teddi", "Blackim", 35, 77),
        ("Jay", "Allen", 46, 97);
