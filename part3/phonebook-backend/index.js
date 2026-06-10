require("dotenv").config();
const Person = require("./models/person");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// Bütün şəxsləri gətirən GET sorğusu
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// ID-yə görə tək bir şəxsi gətirən GET sorğusu
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).send({ error: "malformatted id" });
    });
});

// Şəxsi silən DELETE sorğusu
app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        res.status(404).json({
          error: "Person not found",
        });
      }
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).json({
        error: "no finded id",
      });
    });
});

// Yeni şəxs əlavə edən POST sorğusu (Düzəldilmiş Versiya)
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number cannot be empty",
    });
  }

  // 1. Öncə bazada eyni adlı şəxsi axtarırıq
  Person.findOne({ name: body.name })
    .then((samePerson) => {
      if (samePerson) {
        // Əgər tapılsa, funksiyanı dayandırırıq və 400 xətası veririk
        return res.status(400).json({
          error: "name must be unique",
        });
      }

      // 2. Əgər ad unikaldırsa, YALNIZ bu bloqun daxilində yeni şəxsi yaradıb qeyd edirik
      const person = new Person({
        name: body.name,
        number: body.number,
      });

      return person.save().then((newPerson) => {
        res.json(newPerson);
      });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ error: "database error" });
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`started port ${PORT}`));
