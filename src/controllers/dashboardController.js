const pool = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        const [donorResult] = await pool.query('SELECT COUNT(*) as totalDonors FROM Donor');
        
        const [bloodGroupResult] = await pool.query(`
            SELECT Blood_Type, COUNT(*) as count 
            FROM Blood_Bag 
            WHERE Status = 'Available' 
            GROUP BY Blood_Type
        `);
        
        const [pendingRequestsResult] = await pool.query(`
            SELECT COUNT(*) as pendingRequests 
            FROM Blood_Request 
            WHERE Status = 'Pending'
        `);
        
        const [expiringResult] = await pool.query(`
            SELECT COUNT(*) as expiringUnits 
            FROM Blood_Bag 
            WHERE Status = 'Available' AND Expiry_Date <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
        `);

        res.json({
            totalDonors: donorResult[0].totalDonors,
            availableBlood: bloodGroupResult,
            pendingRequests: pendingRequestsResult[0].pendingRequests,
            expiringUnits: expiringResult[0].expiringUnits
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
