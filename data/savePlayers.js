const connectToDatabase = require('./db');

async function savePlayerResult(player, score) {
  const db = await connectToDatabase();
  const collection = db.collection('player_results');

  const result = await collection.insertOne({ player, score, date: new Date() });
  console.log(`New result inserted with _id: ${result.insertedId}`);
}

module.exports = savePlayerResult;