const express = require('express');
const { poolPromise } = require('./db');
const cors = require('cors'); // Import cors package
const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Fetch all products
app.get('/api/products', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM ListOfProducts');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});