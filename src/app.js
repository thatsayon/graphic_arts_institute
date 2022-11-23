const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require("path")
const app = express();
const hbs = require('hbs')
const Register = require("./models/registers");
const async = require('hbs/lib/async');
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


app.use(session({
    secret: 'midgeneration',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.get('/', (req, res) => {
    res.render('index', {val:req.flash('wrong')})
});

app.get('/confirm', (req, res) => {
    res.render('confirm')
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
            department : req.body.department,
            password : "123456"
        })

        const register = await registerUser.save()
        res.status(201).render("confirm", {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            boardroll : req.body.boardroll,
            semester : req.body.semester,
            gender : req.body.gender,
            shift : req.body.shift,
            department : req.body.department
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get('/chat', (req, res)=> {
    res.render("chat")
})

app.post('/chat', async(req, res) => {
    try {
        password = req.body.password;
        confirmPassword = req.body.conpassword;
        if(password == confirmPassword){
            boardrolla = req.body.boardroll;
            var query = {boardroll:boardrolla};
            var newQuery = {$set: {password:password}};
            Register.updateOne(query, newQuery, (err, res) => {
                if(err) throw err;
                console.log("done")
            })
        } 
        res.render('chat')
    } catch(error) {
        res.status(400).send(error);
    }
})


app.post('/auth', async(req, res) => {
    try {
        boardroll = req.body.boardroll;
        console.log(boardroll);
        const data = Register.find({boardroll:boardroll}, (err, data) => {
            if(err){
                console.log(err);
            } else {
                if(data.length == 0){
                    res.redirect('/');
                } else {
                    if(data[0].password == req.body.pass){
                        res.redirect('chat');
                    } else {
                        req.flash('wrong', 'Wrong Board Roll or Password')
                        res.redirect('/');
                    }
                }
            }
        })
        console.log(data)
    } catch(error){
        res.status(400).send(error);
    }
})

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
})