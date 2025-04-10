var mongoClient = require('mongodb').MongoClient;
var express = require('express');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const connectionString = "mongodb://127.0.0.1:27017";

app.get("/get-data" ,(req , res) => {
    mongoClient.connect(connectionString).then((clientObj)=>{
        var database = clientObj.db("mployee");
        database.collection("tbl_data").find({}).toArray().then((document)=>{
            res.send(document);
            res.end();
        }).catch((error)=>{console.log(`Error in fetching data`,error)})
    })
})





app.get("/",(req , res) => {
    res.send("Welcome to Job Listing Web Application Task ");
    res.end()
});

app.listen(5050);
console.log(`Server started at : http://127.0.0.1:5050`);





