require('dotenv').config();

const express = require("express");
const router = express.Router();
module.exports = router;
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const bodyParser = require('body-parser');

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const salt = 10;

// bcrypt.genSalt(10, (error, salt) => {

// })

const userRoutes = require('./routes/userRoutes')
const runRoutes = require('./routes/runRoutes')

mongoose.connect(mongoString, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Fitness Database Connected')
});



const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', userRoutes);
//set this up after userRoutes are created
// app.use('/exercise', exerciseRoutes);
app.use("/exercise", runRoutes)



// mongoose.connect('mongodb://127.0.0.1/todolistDB');

app.get('/', (req, res) => {
  res.send("hello Adam")
});


app.listen(3001, () => {
  console.log("Server started on PORT 3001")
})

module.exports = app;