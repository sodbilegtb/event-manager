const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "..", "events.json");

function loadEvents() {
  if (!fs.existsSync(dataPath)) return [];
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function saveEvents(events) {
  fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
}

exports.listEvents = (req, res) => {
  const events = loadEvents();
  res.render("list", { events });
};

exports.showCreateForm = (req, res) => {
  res.render("create");
};

exports.createEvent = (req, res) => {
  const events = loadEvents();
  const newEvent = req.body;
  events.push(newEvent);
  saveEvents(events);
  res.redirect("/events");
};

exports.showEditForm = (req, res) => {
    const index = parseInt(req.params.index);
    const events = loadEvents();
    const event = events[index];
  
    if (!event) return res.status(404).send("Event not found");
  
    res.render("edit", { event, index });
  };
  
  exports.updateEvent = (req, res) => {
    const index = parseInt(req.params.index);
    const events = loadEvents();
  
    if (!events[index]) return res.status(404).send("Event not found");
  
    events[index] = req.body;
    saveEvents(events);
    res.redirect("/events");
  };
  
  exports.deleteEvent = (req, res) => {
    const index = parseInt(req.params.index);
    let events = loadEvents();
  
    if (!events[index]) return res.status(404).send("Event not found");
  
    events.splice(index, 1);
    saveEvents(events);
    res.redirect("/events");
  };
  