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
// Fetch product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM ListOfProducts WHERE id =' + id
        console.log(query)
        const pool = await poolPromise;
        const result = await pool.request()
            .query(query);
        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error fetching products by category:', error.message);
        res.status(500).send(error.message);
    }
});



// Fetch products by category
app.get('/api/products/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        console.log(`Fetching products in category: ${category}`);
        const pool = await poolPromise;
        const query = "SELECT * FROM ListOfProducts WHERE category='"+category+"'" ;
        console.log(query);
        const result = await pool.request()
            .query(query);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching products by category:', error.message);
        res.status(500).send(error.message);
    }
});

// Insert form data
app.post('/api/contact', async (req, res) => {
    try {
        const { username, email, phone, message } = req.body;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .input('email', email)
            .input('phone', phone)
            .input('message', message)
            .query('INSERT INTO ContactUS (name, email, phone, message) VALUES (@username, @email, @phone, @message)');
        res.status(201).send({ success: true, message: 'Message inserted successfully!' });
    } catch (error) {
        console.error('Error inserting message:', error.message);
        res.status(500).send(error.message);
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});