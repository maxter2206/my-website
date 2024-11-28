const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Database setup
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        db.run(
            'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, name TEXT, message TEXT)',
            (err) => {
                if (err) console.error('Error creating table:', err.message);
            }
        );
    }
});

// Endpoint to save messages
app.post('/api/messages', (req, res) => {
    const { name, message } = req.body;
    db.run(
        'INSERT INTO messages (name, message) VALUES (?, ?)',
        [name, message],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ id: this.lastID });
            }
        }
    );
});

// Endpoint to fetch messages
app.get('/api/messages', (req, res) => {
    db.all('SELECT * FROM messages', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
 
