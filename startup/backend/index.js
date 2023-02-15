const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();

MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function(err, client) {
  if (err) throw err;

  const db = client.db("HomePage");

  app.get("/data", function(req, res) {
    db.collection("Blog").find({}).toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

  app.listen(3000, function() {
    console.log("API running on port 3000");
  });
});

