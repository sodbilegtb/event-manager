const express = require("express");
const app = express();
const port = 3001;

app.get("/", function (req, res) {
    res.send(`
        <h1>Welcome to the Events App!</h1>
        <p>Click here to go to <a href="/hello">/hello</a></p>
    `);
});

// /hello route
app.get("/hello", function (req, res) {
    res.send("Hello Events!");
});

app.listen(port, function () {
    console.log("Express listening on " + port);
});