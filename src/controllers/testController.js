const pool = require('../config/db');

exports.getAllTests = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT t.*, b.Blood_Type, l.Name as LabName
            FROM Blood_Test_Result t
            LEFT JOIN Blood_Bag b ON t.Bag_ID = b.Bag_ID
            LEFT JOIN Laboratory l ON t.Lab_ID = l.Lab_ID
            ORDER BY t.Test_ID DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addTestResult = async (req, res) => {
    const { Bag_ID, Lab_ID, Test_Type, Result } = req.body;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Add test result
        await connection.query(
            'INSERT INTO Blood_Test_Result (Bag_ID, Lab_ID, Test_Type, Result) VALUES (?, ?, ?, ?)',
            [Bag_ID, Lab_ID, Test_Type, Result]
        );

        // Update Blood Bag Status based on Result
        let newStatus = 'Testing';
        if (Result === 'Negative') {
            newStatus = 'Available'; // Safe
        } else if (Result === 'Positive') {
            newStatus = 'Unsafe'; // Unsafe
        }

        await connection.query(
            'UPDATE Blood_Bag SET Status = ? WHERE Bag_ID = ?',
            [newStatus, Bag_ID]
        );

        await connection.commit();
        res.status(201).json({ message: 'Test result added and blood bag status updated' });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};
