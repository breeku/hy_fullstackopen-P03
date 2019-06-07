require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")
const port = process.env.PORT || 3001

app.use(express.static("build"))

app.use(bodyParser.json())

app.use(cors())

// https://stackoverflow.com/questions/51409771/logging-post-body-size-using-morgan-when-request-is-received
morgan.token("body", function(req, res) {
    return JSON.stringify(req.body)
})
app.use(
    morgan(
        ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
    )
)

/* let json = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    },
    {
        name: "Dan Abramov",
        number: "39-23-6423122",
        id: 3
    }
]; */

app.get("/api/persons", (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get("/api/info", (req, res) => {
    Person.countDocuments().exec((err, count) => {
        if (err) {
            res.send(err)
            return
        }
        res.json("Phonebook has info for " + count + " people " + new Date())
    })
})

app.get("/api/persons/:id", (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(success => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(err => next(err))
})

app.post("/api/persons", (req, res, next) => {
    /*  const body = req.body;
    if (!body.name) {
        return res.status(417).json({ error: "name not included" });
    } else if (!body.number) {
        return res.status(417).json({ error: "number not included" });
    } else if (json.find(person => person.name === body.name)) {
        return res.status(417).json({ error: "name must be unique" });
    }

    const id = generateId(10000);

    const person = {
        name: body.name,
        number: body.number,
        id: id
    };

    json = json.concat(person);
    res.status(200).json(id); */
    const body = req.body

    if (body.name === "" || body.number === "") {
        return res.status(400).json({ error: "content missing" })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => {
            res.json(savedPerson._id.toJSON())
        })
        .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).send({ error: "malformatted id" })
    } else if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message })
    }

    next(err)
}

app.use(errorHandler)

/* let generateId = max => {
    let id = Math.floor(Math.random() * max + 1);
    if (json.find(person => person.id === id)) {
        generateId(max);
    }
    return id;
}; */

app.listen(port, () => console.log(`Server listening on port ${port}!`))
