const pool = require('../config/db');

exports.getAllStaff = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT s.*, b.Name as BankName 
            FROM Staff s
            LEFT JOIN Blood_Bank b ON s.Bank_ID = b.Bank_ID
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addStaff = async (req, res) => {
    const { Name, Role, Bank_ID } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Staff (Name, Role, Bank_ID) VALUES (?, ?, ?)',
            [Name, Role, Bank_ID]
        );
        res.status(201).json({ message: 'Staff added successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
