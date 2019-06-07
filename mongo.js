const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-jk9xg.mongodb.net/fullstack?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
    Person.find({}).then(persons => {
        console.log("phonebook:");
        for (person of persons) {
            console.log(person.name + " " + person.number)
        }
        mongoose.connection.close();
        process.exit(1);
    });
} else {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        name,
        number
    });

    person.save().then(response => {
        console.log("added " + name + " number " + number + " to phonebook");
        mongoose.connection.close();
    });
}
