const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let todos = [];

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    done: false
  };
  todos.push(todo);
  res.json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.sendStatus(404);
  todo.done = !todo.done;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

app.listen(3333, () => {
  console.log("Running on http://localhost:3333");
});