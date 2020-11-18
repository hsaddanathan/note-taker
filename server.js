//1. Require Express
const express = require("express");
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
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req,res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


//4. Listen on the port
app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});

