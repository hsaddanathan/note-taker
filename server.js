//1. Require Express
const express = require("express");
const fs = require("fs");
const { appendFile } = require("fs");
const path = require("path");

//2.Create Instance of Express

const app = express();

//3. Define the PORT
const PORT = process.env.PORT || 8080;

//6. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//5. Add a route
// app.get("/api/config", (req,res) =>{
//     res.send("My config object will go here");
// });

app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Added a test note to see notes
app.get("/api/notes", (req,res) => {
    fs.readFile("./db/db.json",(err,data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        return res.json(savedNotes);
    });
});
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
//4. Listen on the port
app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});

