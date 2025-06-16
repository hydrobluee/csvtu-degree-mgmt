CREATE DATABASE Temp;
USE Temp;

CREATE TABLE Student (
  roll_no INT PRIMARY KEY,
  name VARCHAR(50),
  marks INT,
  grade VARCHAR(1),
  city VARCHAR(50)
);

INSERT INTO Student 
(roll_no, name, marks, grade, city)
VALUES
(101, "Vivek", 78, "C", "Pune"),
(102, "Ali", 93, "A", "Mumbai"),
(103, "Elon", 85, "B", "Mumbai"),
(104, "Don", 96, "A", "Delhi"),
(105, "JK", 12, "F", "Delhi"),
(106, "Doremon", 82, "B", "Delhi");


SELECT city, COUNT(roll_no)
FROM Student 
GROUP BY city
HAVING MAX(marks) > 90;