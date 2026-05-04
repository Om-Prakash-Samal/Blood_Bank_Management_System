const pool = require('../config/db');

exports.getAllRequests = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, p.Name as PatientName, p.Blood_Type_Needed, h.Name as HospitalName 
            FROM Blood_Request r
            LEFT JOIN Patient p ON r.Patient_ID = p.Patient_ID
            LEFT JOIN Hospital h ON r.Hospital_ID = h.Hospital_ID
            ORDER BY r.Request_Date DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addRequest = async (req, res) => {
    const { Request_Date, Urgency, Patient_ID, Hospital_ID } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO Blood_Request (Request_Date, Urgency, Patient_ID, Hospital_ID, Status) VALUES (?, ?, ?, ?, ?)',
            [Request_Date, Urgency, Patient_ID, Hospital_ID, 'Pending']
        );
        res.status(201).json({ message: 'Request created successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.assignBag = async (req, res) => {
    const { id } = req.params;
    const { Bag_ID, Status } = req.body; // Status usually 'Completed' or 'Approved'

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Update Request
        await connection.query(
            'UPDATE Blood_Request SET Bag_ID = ?, Status = ? WHERE Request_ID = ?',
            [Bag_ID, Status, id]
        );

        // 2. If completed/approved, mark the Blood Bag as Used
        if (Status === 'Completed' || Status === 'Approved') {
            await connection.query(
                'UPDATE Blood_Bag SET Status = ? WHERE Bag_ID = ?',
                ['Used', Bag_ID]
            );
        }

        await connection.commit();
        res.json({ message: 'Blood bag assigned and request updated successfully' });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};
