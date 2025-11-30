const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Path to DB
const dbPath = path.join(__dirname, "db", "links.db");

// Connect to SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Failed to connect to DB:", err.message);
    } else {
        console.log("✅ Connected to SQLite database");
    }
});

// Create TABLE with all required fields
db.run(`
    CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        about TEXT,
        location TEXT,
        followerCount TEXT,
        connectionCount TEXT,
        url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

// API to save full scraped profile
app.post("/save-profile", (req, res) => {
    const { name, about, location, followerCount, connectionCount, url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    const query = `
        INSERT INTO profiles (name, about, location, followerCount, connectionCount, url)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [name, about, location, followerCount, connectionCount, url],
        function (err) {
            if (err) {
                console.error("❌ Insert error:", err.message);
                return res.status(500).json({ message: "Failed to save profile" });
            }

            res.json({
                message: "Profile saved successfully",
                id: this.lastID
            });
        }
    );
});

// API to fetch all saved data
app.get("/profiles", (req, res) => {
    db.all(`SELECT * FROM profiles ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error("❌ Fetch error:", err.message);
            return res.status(500).json({ message: "Failed to fetch profiles" });
        }

        res.json(rows);
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});