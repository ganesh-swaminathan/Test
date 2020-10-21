// server.js
const express = require("express");
const server = express();

const body_parser = require("body-parser");
// parse JSON (application/json content-type)
server.use(body_parser.json());
const port = 4000;

// << db setup >>
const db = require("./db");
const dbName = "genesis";
const collectionName = "lyrics";

db.initialize(
  dbName,
  collectionName,
  function (dbCollection) {
    // successCallback
    dbCollection.find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
    });

    // API1: get all the data
    server.get("/items", (request, response) => {
      // return updated list
      dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        response.json(result);
      });
    });

    // API2: get selected data using Id.
    server.get("/items/:Id", (request, response) => {
      const itemId = request.params.Id;
      console.log(itemId);
      dbCollection.findOne({ Id: itemId }, (error, result) => {
        if (error) throw error;
        // return item
        response.json(result);
      });
    });
  },
  function (err) {
    // failureCallback
    throw err;
  }
);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
