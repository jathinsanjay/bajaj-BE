const express = require('express');
const cors= require("cors");

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'  // Adjust this to the front-end URL
  }));

// Use environment variable for port, fallback to 8000 if not set
const port = process.env.PORT || 8000;

// Endpoint to verify server is running
app.get('/', (req, res) => {
  res.send('hello world');
});
app.get('/fhl',(req, res) => {
    res.status(200).json({
         
    });
  })

// Function to separate alphabets and numbers
const separateAlphabetsAndNumbers = (inputArray) => {
    const numbers = [];
    const alphabets = [];

    inputArray.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    return { numbers, alphabets };
};

// Function to find the highest alphabet
const findHighestAlphabet = (alphabets) => {
    if (alphabets.length === 0) return [];

    return alphabets.reduce((highest, current) => {
        return current.toLowerCase() > highest.toLowerCase() ? current : highest;
    });
};

// POST endpoint for processing data
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    try {
        const { numbers, alphabets } = separateAlphabetsAndNumbers(data);
        const highestAlphabet = findHighestAlphabet(alphabets);
        
        res.status(200).json({
            "is_success": true,
            "user_id": "vaeez_mohamed_21112003",
            "email": "mv5552@srmist.edu.in",
            "roll_number": "RA2111026010509",
            "Number": numbers,
            "Alphabets": alphabets,
            "highest_alphabet": highestAlphabet
        });
    } catch (e) {
        res.status(500).json({
            "is_success": false,
            "error": "Internal server error"
        });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
