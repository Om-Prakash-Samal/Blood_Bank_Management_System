const pool = require('../config/db');

exports.getAllBloodBags = async (req, res) => {
    try {
        let query = 'SELECT * FROM Blood_Bag WHERE 1=1';
        const queryParams = [];

        if (req.query.Blood_Type) {
            query += ' AND Blood_Type = ?';
            queryParams.push(req.query.Blood_Type);
        }

        if (req.query.Status) {
            query += ' AND Status = ?';
            queryParams.push(req.query.Status);
        }

        query += ' ORDER BY Expiry_Date ASC';

        const [rows] = await pool.query(query, queryParams);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBloodBagStatus = async (req, res) => {
    const { id } = req.params;
    const { Status } = req.body;

    try {
        await pool.query('UPDATE Blood_Bag SET Status = ? WHERE Bag_ID = ?', [Status, id]);
        res.json({ message: 'Blood bag status updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
