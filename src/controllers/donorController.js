const pool = require('../config/db');

exports.getAllDonors = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Donor');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addDonor = async (req, res) => {
    const { Name, Contact_No, Date_of_Birth, Age } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Donor (Name, Contact_No, Date_of_Birth, Age) VALUES (?, ?, ?, ?)',
            [Name, Contact_No, Date_of_Birth, Age]
        );
        res.status(201).json({ message: 'Donor added successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateDonor = async (req, res) => {
    const { id } = req.params;
    const { Name, Contact_No, Date_of_Birth, Age } = req.body;
    try {
        await pool.query(
            'UPDATE Donor SET Name = ?, Contact_No = ?, Date_of_Birth = ?, Age = ? WHERE Donor_ID = ?',
            [Name, Contact_No, Date_of_Birth, Age, id]
        );
        res.json({ message: 'Donor updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDonor = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Donor WHERE Donor_ID = ?', [id]);
        res.json({ message: 'Donor deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
