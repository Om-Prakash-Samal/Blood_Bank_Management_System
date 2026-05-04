const pool = require('../config/db');

exports.getAllHospitals = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Hospital');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addHospital = async (req, res) => {
    const { Name, Location } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Hospital (Name, Location) VALUES (?, ?)',
            [Name, Location]
        );
        res.status(201).json({ message: 'Hospital added successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
