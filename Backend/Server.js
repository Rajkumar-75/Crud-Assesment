const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient,ObjectId} = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const mongoURI = "mongodb://localhost:27017";
const dbName = "CrudOperation";
const Crud = "crud";

let db;

MongoClient.connect(mongoURI)
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);
   

    app.post("/Detail", async (req, res) => {
        try {
          const newData = req.body;
          const result = await db.collection(Crud).insertOne(newData);
      
        } catch (error) {
          console.error("Error adding data:", error);
        }
      });

      app.get("/DataFetch", async (req, res) => {
        try {
          const data = await db.collection(Crud).find().toArray();
          res.json(data);
        } catch (error) {
          console.error("Error getting data:", error);
          res.status(500).json({ message: "Error getting data" });
        }
      });

      app.put("/update-Grade/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const updateData = req.body;
          const result = await db
            .collection(Crud)
            .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
          res.json(result);
        } catch (error) {
          console.error("Error updating data:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
  

      app.delete("/deleteData/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const result = await db
            .collection(Crud)
            .deleteOne({ _id: new ObjectId(id) });
          res.json(result);
        } catch (error) {
          console.error("Error deleting data:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      });
  

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
