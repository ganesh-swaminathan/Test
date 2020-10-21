var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin01:empty@localhost:27017/admin";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});