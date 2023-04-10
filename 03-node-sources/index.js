const express = require("express");
const chalk = require("chalk");
const path = require("path");
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");
const port = 5000;
// html in dir pages
const root = "index";

// init server express
const app = express();

// Шаблонизатор
app.set("view engine", "ejs");
app.set("views", "pages");

// подключение клиентского скрипта
app.use(express.static(path.resolve(__dirname, "public")));

// для отправки данных c сервера
app.use(
  express.urlencoded({
    extended: true,
  })
);
// для отправки данных на сервер
app.use(express.json());

app.get("/", async (req, res) => {
  res.render(root, {
    title: "Node simple service",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render(root, {
    title: "Node simple service",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);

  res.render(root, {
    title: "Node simple service",
    notes: await getNotes(),
    created: false,
  });
});

app.put("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (req.body.title === null) return;

  console.log(req.body.title);

  await updateNote(req.body);

  res.render(root, {
    title: "Node simple service",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on ${port}`));
});
