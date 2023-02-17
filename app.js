const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());


const people = [];

app.post('/api/v1/people', (req, res) => {
  const name = req.body.name;
  const age = Number(req.body.age);
  if (!name) {
    res.status(400).json({ error: "Please enter a name." });
    return;
  }
  if (!age) {
    res.status(400).json({ error: "Please enter an age." });
    return;
  }
  if (isNaN(age) || age < 0) {
    res.status(400).json({ error: "The age must be a non-negative number." });
    return;
  }
  req.body.age = age;
  req.body.index = people.length;
  people.push(req.body);
  res
    .status(201)
    .json({ message: "A person record was added.", index: req.body.index });
})

app.get('/api/v1/people', (req, res) => {
  res.json(people);
})

app.get('/api/v1/people/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id) ||
    !Number.isInteger(id) ||
    id < 0 ||
    id >= people.length) {
    res.status(404).json({ message: "The person record was not found." });
    return;
  }
  res.status(200).json(people[id]);
})

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  // console.log("listening on port 3000...");
});

module.exports = { app, server };