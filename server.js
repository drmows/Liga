const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db');
const savePlayerResult = require('./savePlayers');

const app = express();
app.use(bodyParser.json());

app.get('/api/players', async (req, res) => {
  const db = await connectToDatabase();
  const players = await db.collection('players').find().toArray();
  res.json({ players });
});

app.post('/api/results', async (req, res) => {
  const result = req.body;
  await savePlayerResult(result.player, result.score);
  res.status(201).json({ message: 'Result saved successfully' });
});

app.delete('/api/results', async (req, res) => {
  const resultId = req.body._id;
  const db = await connectToDatabase();
  const collection = db.collection('player_results');
  await collection.deleteOne({ _id: resultId });
  res.status(200).json({ message: 'Result deleted successfully' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});