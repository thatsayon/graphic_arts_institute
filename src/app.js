const express = require('express');
const mongoose = require('mongoose');
const path = require("path")
const app = express();
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://ayon:400220821fjw0676@cluster0.zkeepbh.mongodb.net/GAI?retryWrites=true&w=majority"

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch(err){
        console.error(err)
    }
}

connect()

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path))
app.set("view engine", "hbs")
app.get('/', (req, res) => {
    res.render('index')
});

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
})