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
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      const date = new Date();
      res.send(
        `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`,
      );
    })
    .catch((error) => {
      next(error);
    });
});

// ID-yə görə tək bir şəxsi gətirən GET sorğusu
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

// Şəxsi silən DELETE sorğusu
app.delete("/api/persons/:id", (req, res, next) => {
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
      next(error);
    });
});

// Yeni şəxs əlavə edən POST sorğusu (Düzəldilmiş Versiya)
app.post("/api/persons", (req, res, next) => {
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

      const person = new Person({
        name: body.name,
        number: body.number,
      });

      return person.save().then((newPerson) => {
        res.json(newPerson);
      });
    })
    .catch((error) => {
      next(error);
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`started port ${PORT}`));
