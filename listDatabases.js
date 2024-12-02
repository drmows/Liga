const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://ickwesanders:ZVH7LSLfpftbcd4s@cluster0.khisw.mongodb.net/?retryWrites=true&w=majority';

async function listDatabases() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  } finally {
    await client.close();
  }
}

listDatabases().catch(console.error);