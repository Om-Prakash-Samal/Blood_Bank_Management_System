-- Run this to setup the necessary tables for the Blood Bank Management System

CREATE DATABASE IF NOT EXISTS blood_bank_db;
USE blood_bank_db;

-- Admins Table for authentication
CREATE TABLE IF NOT EXISTS Admins (
    Admin_ID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Name VARCHAR(100) NOT NULL
);

-- Insert default admin (password: 'admin123' - you should change this later, it will be hashed if using bcrypt but for simplicity in setup script we will insert a bcrypt hash of 'admin123')
-- The hash for 'admin123' is '$2a$10$w85I/.P1G4/Xw6A2z0VjMe.jM.WwI22E/P/gE4yJtM3/iO7k7Kq9u'
INSERT IGNORE INTO Admins (Username, Password, Name) VALUES ('admin', '$2b$10$7mFyDpk8t43TGgVcBcaQLuMg0x9hkOh.mllWU2vhoUTO6mL/o3hZu', 'System Admin');

-- Blood_Bank Table
CREATE TABLE IF NOT EXISTS Blood_Bank (
    Bank_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Address TEXT NOT NULL
);

-- Hospital Table
CREATE TABLE IF NOT EXISTS Hospital (
    Hospital_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Location TEXT NOT NULL
);

-- Laboratory Table
CREATE TABLE IF NOT EXISTS Laboratory (
    Lab_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Donor Table
CREATE TABLE IF NOT EXISTS Donor (
    Donor_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Contact_No VARCHAR(20) NOT NULL,
    Date_of_Birth DATE NOT NULL,
    Age INT
);

-- Patient Table
CREATE TABLE IF NOT EXISTS Patient (
    Patient_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Blood_Type_Needed ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL
);

-- Blood_Donation_Record Table
CREATE TABLE IF NOT EXISTS Blood_Donation_Record (
    Donation_Number INT AUTO_INCREMENT PRIMARY KEY,
    Donation_Date DATE NOT NULL,
    Volume INT NOT NULL, -- in ml
    Donor_ID INT,
    FOREIGN KEY (Donor_ID) REFERENCES Donor(Donor_ID) ON DELETE SET NULL
);

-- Blood_Bag Table
CREATE TABLE IF NOT EXISTS Blood_Bag (
    Bag_ID INT AUTO_INCREMENT PRIMARY KEY,
    Blood_Type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
    Collection_Date DATE NOT NULL,
    Expiry_Date DATE NOT NULL,
    Status ENUM('Available', 'Used', 'Expired', 'Testing', 'Unsafe') DEFAULT 'Testing',
    Donation_Number INT,
    FOREIGN KEY (Donation_Number) REFERENCES Blood_Donation_Record(Donation_Number) ON DELETE CASCADE
);

-- Blood_Test_Result Table
CREATE TABLE IF NOT EXISTS Blood_Test_Result (
    Test_ID INT AUTO_INCREMENT PRIMARY KEY,
    Test_Type VARCHAR(100) NOT NULL,
    Result ENUM('Positive', 'Negative', 'Pending') DEFAULT 'Pending',
    Bag_ID INT,
    Lab_ID INT,
    FOREIGN KEY (Bag_ID) REFERENCES Blood_Bag(Bag_ID) ON DELETE CASCADE,
    FOREIGN KEY (Lab_ID) REFERENCES Laboratory(Lab_ID) ON DELETE SET NULL
);

-- Blood_Request Table
CREATE TABLE IF NOT EXISTS Blood_Request (
    Request_ID INT AUTO_INCREMENT PRIMARY KEY,
    Request_Date DATE NOT NULL,
    Status ENUM('Pending', 'Approved', 'Completed', 'Rejected') DEFAULT 'Pending',
    Urgency ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    Patient_ID INT,
    Bag_ID INT NULL, -- Assigned blood bag
    Hospital_ID INT,
    FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (Bag_ID) REFERENCES Blood_Bag(Bag_ID) ON DELETE SET NULL,
    FOREIGN KEY (Hospital_ID) REFERENCES Hospital(Hospital_ID) ON DELETE SET NULL
);

-- Staff Table
CREATE TABLE IF NOT EXISTS Staff (
    Staff_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Role VARCHAR(50) NOT NULL,
    Bank_ID INT,
    FOREIGN KEY (Bank_ID) REFERENCES Blood_Bank(Bank_ID) ON DELETE SET NULL
);
