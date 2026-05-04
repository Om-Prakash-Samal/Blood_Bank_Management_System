const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [admins] = await pool.query('SELECT * FROM Admins WHERE Username = ?', [username]);
        if (admins.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
        
        const admin = admins[0];
        const isMatch = await bcrypt.compare(password, admin.Password);
        
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
        
        const token = jwt.sign({ id: admin.Admin_ID, username: admin.Username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
