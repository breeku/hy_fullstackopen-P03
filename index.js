const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors")
const port = process.env.PORT

app.use(bodyParser.json());

app.use(cors())

app.use(express.static('build'))

// https://stackoverflow.com/questions/51409771/logging-post-body-size-using-morgan-when-request-is-received
morgan.token("body", function(req, res) {
    return JSON.stringify(req.body);
});
app.use(
    morgan(
        ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
    )
);

let json = [
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
];

app.get("/api/persons", (req, res) => {
    res.send(json);
});

app.get("/api/info", (req, res) => {
    let length = json.length;
    res.send(
        "Phonebook has info for " + length + " people <br><br>" + new Date()
    );
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = json.find(person => person.id === id);
    if (person) {
        res.send(person);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    json = json.filter(person => person.id !== id);
    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const body = req.body;
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
    res.status(200).json(id);
});

let generateId = max => {
    let id = Math.floor(Math.random() * max + 1);
    if (json.find(person => person.id === id)) {
        generateId(max);
    }
    return id;
};

app.listen(port, () => console.log(`Server listening on port ${port}!`));
