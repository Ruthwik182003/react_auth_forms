import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection pool using .env values
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME
});

// Test DB connection
(async () => {
    try {
        await db.getConnection();
        console.log("✅ DB connection successful");
    } catch (err) {
        console.error("❌ DB connection failed:", err.message);
    }
})();

// API endpoint
app.post('/api/form-submit', async (req, res) => {
    const { name, email, phone, country } = req.body;

    try {
        const [result] = await db.execute(
            'INSERT INTO form_app (name, email, phone, country) VALUES (?, ?, ?, ?)',
            [name, email, phone, country]
        );
        console.log("✅ Data inserted:", result);
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (err) {
        console.error("❌ Error inserting submission:", err);
        res.status(500).json({ message: 'Database error', error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
