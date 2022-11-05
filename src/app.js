const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const app = express();
const hbs = require('hbs')
const Register = require("./models/registers")
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://ayon:400220821fjw0676@cluster0.zkeepbh.mongodb.net/GAI?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error(err)
    }
}

connect()

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/confirm', (req, res) => {
    res.send("Confirm")
});

app.post('/confirm', async (req, res) => {
    try {
        const registerUser = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            boardroll : req.body.boardroll,
            semester : req.body.semester,
            gender : req.body.gender,
            shift : req.body.shift,
            department : req.body.department
        })

        const register = await registerUser.save()
        res.status(201).render("index");
    } catch (error) {
        res.status(400).send(error);
    }
})
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
})