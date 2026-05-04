const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/donors', require('./src/routes/donors'));
app.use('/api/donations', require('./src/routes/donations'));
app.use('/api/inventory', require('./src/routes/inventory'));
app.use('/api/patients', require('./src/routes/patients'));
app.use('/api/requests', require('./src/routes/requests'));
app.use('/api/hospitals', require('./src/routes/hospitals'));
app.use('/api/staff', require('./src/routes/staff'));
app.use('/api/tests', require('./src/routes/tests'));
app.use('/api/dashboard', require('./src/routes/dashboard'));

// Serve UI pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html')));
app.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'dashboard.html')));
app.get('/donors', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'donors.html')));
app.get('/donations', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'donations.html')));
app.get('/inventory', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'inventory.html')));
app.get('/patients', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'patients.html')));
app.get('/requests', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'requests.html')));
app.get('/hospitals', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'hospitals.html')));
app.get('/staff', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'staff.html')));
app.get('/tests', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pages', 'tests.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
