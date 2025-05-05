const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const eventController = require("./controllers.js/eventcontroller");

const app = express();
const port = 3001;

// Setup Handlebars
app.engine("handlebars", exphbs.create({ defaultLayout: "main" }).engine);
app.set("view engine", "handlebars");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static("public"));
app.use("/page", express.static("page"));  // old static pages

// Routes
app.get("/", (req, res) => res.redirect("/events"));
app.get("/events", eventController.listEvents);
app.get("/events/create", eventController.showCreateForm);
app.post("/events", eventController.createEvent);
app.get("/events/:index/edit", eventController.showEditForm);
app.post("/events/:index/edit", eventController.updateEvent);
app.post("/events/:index/delete", eventController.deleteEvent);


app.listen(port, () => console.log("Listening on http://localhost:" + port));
