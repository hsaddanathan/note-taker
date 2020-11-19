//1. Require Express
const express = require("express");
const fs = require("fs");
const { appendFile } = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

//2.Create Instance of Express

const app = express();

//3. Define the PORT
const PORT = process.env.PORT || 3000;

const notes =[{
    title: "Groceries",
    text: "Apples, Bananas, Cherries"
}]
//6. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Link CSS and JS
app.get("/assets/js/index.js", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/assets/css/styles.css", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

//5. Add a route

    //View Routes
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req,res) => {
    fs.readFile("./db/db.json", (err,data) => {
        if (err) throw err;
        const savedNotes = JSON.parse(data);
        return res.json(savedNotes);
    });
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

    //API Routing
app.post("/api/notes", (req,res) => {
    let savedNotes = fs.readFileSync("./db/db.json");
    savedNotes = JSON.parse(savedNotes);
    req.body.id = uuidv4();
    savedNotes.push(req.body);
    savedNotes=JSON.stringify(savedNotes);
    fs.writeFileSync("./db/db.json", savedNotes);
    savedNotes=JSON.parse(savedNotes);
    return res.json(savedNotes);
    
})



//4. Listen on the port
app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});

