const express = require("express");
var MongoClient = require("mongodb").MongoClient;

const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
// Connect to the db
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var query = { address: "Highway 37" };
  dbo.collection("customers").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

// MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
//   if (err) throw err;
//   if (!err) {
//     console.log("We are connected");
//     //console.log(db.name)
//     var collection = db.collection("testtable");
//     var doc1 = { hello: "doc1" };
//     var doc2 = { hello: "doc2" };
//     var lotsOfDocs = [{ hello: "doc3" }, { hello: "doc4" }];

//     collection.insert(doc1);

//     collection.insert(doc2, { w: 1 }, function (err, result) {});

//     collection.insert(lotsOfDocs, { w: 1 }, function (err, result) {});
//   }
//   //Write databse Insert/Update/Query code here..
// });

// Insert data :

var sampledata = [{
	"Id": "001",
	"Title": "Sample Title",
	"Lyrics": "Refer html.html",
	"copyrights": "False",
	"Audio": "src_path.mid"
}]
var dbo;
app.listen(3000, () => {
  console.log("started");
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    dbo = db.db("test");    
  });
  var collection = dbo.song;
  dbo.collection("song").insertMany(sampledata, function(err, res) {
    if (err){
      console.log(err)
    }
    console.log(res.insertedCount+" documents inserted");
    // close the connection to db when you are done with it
    dbo.close();
});
});



app.get("/insertdata", (req, res) => { 
 
    // insert multiple documents to 'users' collection using insertOne
    console.log('insert:')
    dbo.collection("song").insertMany(sampledata, function(err, res) {
      if (err){
        console.log(err)
      }
      console.log(res.insertedCount+" documents inserted");
      // close the connection to db when you are done with it
      dbo.close();
  });
  

});

app.get("/getdata", (req, res) => {  
  dbo.query("SELECT * FROM song", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

  // var query = { address: "Highway 37" };
  //   dbo.collection("customers").find(query).toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log(result[0]);
  //     res.send(result[0]);
  //     db.close();
  //   });
});

app.get("/data", (req, res) => {  
  var query = { address: "Highway 37" };
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result[0]);
      res.send(result[0]);
      db.close();
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// curd operation : atlas

// << db CRUD routes >>
server.post("/items", (request, response) => {
  const item = request.body;
  dbCollection.insertOne(item, (error, result) => { // callback of insertOne
     if (error) throw error;
     // return updated list
     dbCollection.find().toArray((_error, _result) => { // callback of find
        if (_error) throw _error;
        response.json(_result);
     });
  });
});

server.get("/items/:Id", (request, response) => {
  const itemId = request.params.id;

  dbCollection.findOne({ id: itemId }, (error, result) => {
     if (error) throw error;
     // return item
     response.json(result);
  });
});

server.put("/items/:id", (request, response) => {
  const itemId = request.params.id;
  const item = request.body;
  console.log("Editing item: ", itemId, " to be ", item);

  dbCollection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
     if (error) throw error;
     // send back entire updated list, to make sure frontend data is up-to-date
     dbCollection.find().toArray(function (_error, _result) {
        if (_error) throw _error;
        response.json(_result);
     });
  });
});

server.delete("/items/:id", (request, response) => {
  const itemId = request.params.id;
  console.log("Delete item with id: ", itemId);

  dbCollection.deleteOne({ id: itemId }, function (error, result) {
     if (error) throw error;
     // send back entire updated list after successful request
     dbCollection.find().toArray(function (_error, _result) {
        if (_error) throw _error;
        response.json(_result);
     });
  });
});

