const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ickwesanders:ZVH7LSLfpftbcd4s@cluster0.khisw.mongodb.net/?retryWrites=true&w=majority"; // Ersetze `your_password` mit deinem tatsächlichen Passwort
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db('liga'); // Ersetze 'your_database_name' durch den Namen deiner Datenbank
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

module.exports = connectToDatabase;