const pool = require('../config/db');

exports.getAllDonations = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT d.*, dr.Name as DonorName 
            FROM Blood_Donation_Record d 
            LEFT JOIN Donor dr ON d.Donor_ID = dr.Donor_ID
            ORDER BY d.Donation_Date DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addDonation = async (req, res) => {
    const { Donation_Date, Volume, Donor_ID, Blood_Type } = req.body;
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        // 1. Insert Donation Record
        const [donationResult] = await connection.query(
            'INSERT INTO Blood_Donation_Record (Donation_Date, Volume, Donor_ID) VALUES (?, ?, ?)',
            [Donation_Date, Volume, Donor_ID]
        );
        const Donation_Number = donationResult.insertId;

        // 2. Automatically create a Blood Bag
        // Calculate Expiry Date (typically 42 days for red blood cells)
        const expiryDate = new Date(Donation_Date);
        expiryDate.setDate(expiryDate.getDate() + 42);
        
        await connection.query(
            'INSERT INTO Blood_Bag (Blood_Type, Collection_Date, Expiry_Date, Status, Donation_Number) VALUES (?, ?, ?, ?, ?)',
            [Blood_Type, Donation_Date, expiryDate.toISOString().split('T')[0], 'Testing', Donation_Number]
        );

        await connection.commit();
        res.status(201).json({ message: 'Donation and Blood Bag recorded successfully' });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};
