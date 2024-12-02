const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB-Verbindung
mongoose.connect('mongodb://localhost:27017/liga', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema und Model
const ResultSchema = new mongoose.Schema({
    player1: String,
    player2: String,
    initialMMR1: Number,
    initialMMR2: Number,
    points1: Number,
    points2: Number,
    destructionPoints1: Number,
    destructionPoints2: Number,
    winner: String
});

const Result = mongoose.model('Result', ResultSchema);

// POST-Route
app.post('/results', async (req, res) => {
    try {
        const newResult = new Result(req.body);
        await newResult.save();
        res.status(201).send(newResult);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Server starten
app.listen(3000, () => {
    console.log('Server running on port 3000');
});