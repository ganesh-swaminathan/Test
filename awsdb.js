
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://devops:QWEasd123@cluster0.iszc2.mongodb.net/devops?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
