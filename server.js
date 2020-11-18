//1. Require Express
const express = require("express");
const path = require("path");

//2.Create Instance of Express

const app = express();

//3. Define the PORT
const PORT = process.env.PORT || 8080;

//5. Add a route
app.get("/api/config", (req,res) =>{
    res.send("My config object will go here");
});


//4. Listen on the port
app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});

