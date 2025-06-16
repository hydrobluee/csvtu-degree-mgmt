CREATE DATABASE IF NOT EXISTS DegreeDB;

-- Create roles table
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Create users table
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Create statuses table
CREATE TABLE statuses (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(50) NOT NULL UNIQUE
);

-- Create applications table
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('New Application', 'Enquiry') NOT NULL,
    certificate_type ENUM('Degree Urgent', 'Degree Normal', ) NOT NULL,
    enrollment_number VARCHAR(50) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    roll_number VARCHAR(50) NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    passing_year INT NOT NULL,
    course VARCHAR(100) NOT NULL,
    division VARCHAR(20) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    fees_date DATE NOT NULL,
    fee_status ENUM('Pending', 'Verified', 'Rejected') NOT NULL DEFAULT 'Pending',
    assigned_department ENUM('DegreeCell', 'MPCon') DEFAULT NULL,
    current_status VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create status_history table
CREATE TABLE status_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    status_id INT NOT NULL,
    changed_by INT NOT NULL,
    changed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id),
    FOREIGN KEY (status_id) REFERENCES statuses(status_id),
    FOREIGN KEY (changed_by) REFERENCES users(user_id)
);

INSERT INTO applications
(type, certificate_type, enrollment_number, branch, roll_number, student_name, passing_year, course, division, mobile, email, fees_date, fee_status, assigned_department, current_status)
VALUES
("New Application", "Degree Normal", "EC129", "IT", "134565656", "Rahul Dewangan", 2016, "BTech", "First", "8798788979879", "rahul@gmail.com", 12-12-2024, "Verified", "DegreeCell");