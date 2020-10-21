var MongoClient = require("mongodb").MongoClient,
  f = require("util").format,
  fs = require("fs");

//Specify the Amazon DocumentDB cert
var ca = [fs.readFileSync("stechdevops.pem")];
console.log(ca)
//Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set,
//  and specify the read preference as secondary preferred
var client = MongoClient.connect(
  "mongodb://ec2-user:!@#QWEewq321@ec2-3-16-139-112.us-east-2.compute.amazonaws.com:27017/?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred",
  {
    sslValidate: true,
    sslCA: ca,
    useNewUrlParser: true,
  },
  function (err, client) {
    if (err) throw err;

    //Specify the database to be used
    db = client.db("test");

    //Specify the collection to be used
    col = db.collection("sample");
    col.find(function (err, result){
        console.log(result);
        client.close();
    })
    //Insert a single document
    // col.insertOne({ hello: "Amazon DocumentDB" }, function (err, result) {
    //   //Find the document that was previously written
    //   col.findOne({ hello: "Amazon DocumentDB" }, function (err, result) {
    //     //Print the result to the screen
    //     console.log(result);

    //     //Close the connection
    //     client.close();
    //   });
    // });
  }
);
