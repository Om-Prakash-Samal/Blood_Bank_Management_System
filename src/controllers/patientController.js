const pool = require('../config/db');

exports.getAllPatients = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Patient');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addPatient = async (req, res) => {
    const { Name, Blood_Type_Needed } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Patient (Name, Blood_Type_Needed) VALUES (?, ?)',
            [Name, Blood_Type_Needed]
        );
        res.status(201).json({ message: 'Patient added successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
