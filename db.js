const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ickwesanders:ZVH7LSLfpftbcd4s@cluster0.khisw.mongodb.net/?retryWrites=true&w=majority';

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db('sample_mflix');
}

module.exports = connectToDatabase;