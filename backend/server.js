const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse POST request body (urlencoded and JSON)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'frontend' folder (HTML, CSS, JS)
app.use(express.static('frontend'));

// GET request to the root URL (to check if the server is running)
app.get('/', (req, res) => {
    res.send('Hello, this is your backend!');
});

// POST request to '/submit' to handle form submissions
app.post('/submit', (req, res) => {
    const message = req.body.message; // Extract the message from the form
    console.log('Received message:', message); // Log it in the terminal
    res.send('Message received: ' + message); // Respond with the message
});

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
