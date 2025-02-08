// server.js
const express = require('express');
const path = require('path');
const db = require('./database/database'); // Import the database
const app = express(); // Initialize the app
const port = 3001;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Get all records
app.get('/api/records', (req, res) => {
    const records = db.prepare('SELECT * FROM records').all();
    res.json(records);
});

// Add a new record
app.post('/api/records', (req, res) => {
    const {
        paymentDate,
        bankName,
        balance,
        minPayment,
        interestCharge,
        available,
        amountPaid,
        paidOn,
    } = req.body;

    const stmt = db.prepare(`
        INSERT INTO records (
            paymentDate, bankName, balance, minPayment,
            interestCharge, available, amountPaid, paidOn
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
        paymentDate,
        bankName,
        balance,
        minPayment,
        interestCharge,
        available,
        amountPaid,
        paidOn
    );

    res.status(201).json({ id: result.lastInsertRowid });
});

// Start the server
app.listen(port, () => {
    console.log(`Goalkeeper app running at http://localhost:${port}`);
});