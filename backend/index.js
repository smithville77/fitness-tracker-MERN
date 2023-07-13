require('dotenv').config();

const express = require("express");
const router = express.Router();
module.exports = router;
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

const routes = require('./routes/routes')


mongoose.connect(mongoString, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 });
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
});

database.once('connected', () => {
  console.log('Database Connected')
});



const app = express();
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/api', routes)



// mongoose.connect('mongodb://127.0.0.1/todolistDB');

app.get('/', (req, res) => {
  res.send("hello Adam")
});


app.listen(3001, () => {
  console.log("Server started on PORT 3001")
})