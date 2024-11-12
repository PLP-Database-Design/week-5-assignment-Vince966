// Import dependencies
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json()); // Parses incoming JSON requests

// Database configuration
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


//question one goes here
// Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err);
      res.status(500).send('Error retrieving patients');
      return;
    }
    res.json(results); // Return the results in JSON format
  });
});

// question 2 goes here
// Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err);
      res.status(500).send('Error retrieving providers');
      return;
    }
    res.json(results); // Return the results in JSON format
  });
});

//qustion 3 goes here
// Filter patients by first name
app.get('/patients/search', (req, res) => {
  const { first_name } = req.query;
  const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
  db.query(sql, [first_name], (err, results) => {
    if (err) {
      console.error('Error fetching patients by first name:', err);
      res.status(500).send('Error retrieving patients');
      return;
    }
    res.json(results); // Return the results in JSON format
  });
});

//question 4 goes here
// Retrieve providers by specialty
app.get('/providers/specialty', (req, res) => {
  const { specialty } = req.query;
  const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  
  db.query(sql, [specialty], (err, results) => {
    if (err) {
      console.error('Error fetching providers by specialty:', err);
      res.status(500).send('Error retrieving providers');
      return;
    }
    res.json(results); // Return the results in JSON format
  });
});

// Set server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
