require('dotenv').config();

const express = require("express");
const router = express.Router();
module.exports = router;
const axios = require('axios')
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const bodyParser = require('body-parser');
const cors = require("cors");

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
app.use(cors());
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', userRoutes);
//set this up after userRoutes are created
// app.use('/exercise', exerciseRoutes);
app.use("/exercise", runRoutes)


const fitbitClientId = process.env.FB_CLIENT_ID;
const fitbitClientSecret = process.env.FB_CLIENT_SECRET; // Add this line to retrieve the client secret
const fitbitRedirectUri = 'http://localhost:3000/callback';
const fitbitScopes = 'activity heartrate profile'; // Adjust scopes as needed

// Endpoint to initiate Fitbit OAuth flow
router.get('/auth/fitbit', (req, res) => {
  // Construct the Fitbit authorization URL
  const fitbitAuthUrl = 'https://www.fitbit.com/oauth2/authorize?' +
    `response_type=code&` +
    `client_id=${fitbitClientId}&` +
    `redirect_uri=${fitbitRedirectUri}&` +
    `scope=${fitbitScopes}`;

  // Redirect the user to Fitbit for authorization
  res.redirect(fitbitAuthUrl);
});


// Callback route for handling Fitbit OAuth response
router.get('/auth/fitbit/callback', async (req, res) => {
  const { code } = req.query; // Extract the authorization code from the query parameters

  try {
    // Define the token request parameters
    const tokenRequestData = {
      client_id: fitbitClientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: fitbitRedirectUri,
    };

    // Send a POST request to Fitbit's token endpoint
    const response = await axios.post('https://api.fitbit.com/oauth2/token', null, {
      params: tokenRequestData,
      headers: {
        Authorization: `Basic ${Buffer.from(`${fitbitClientId}:${fitbitClientSecret}`).toString('base64')}`,
      },
    });

    // Extract the access token and other data from the response
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Save the tokens to your database or session as needed
    // Example: await saveTokensToDatabase(accessToken, refreshToken);

    // Redirect the user to a success page or perform further actions
    res.redirect('/auth/fitbit/success'); // Redirect to a success page
  } catch (error) {
    console.error(error);
    res.redirect('/auth/fitbit/error'); // Redirect to an error page
  }
});



// mongoose.connect('mongodb://127.0.0.1/todolistDB');

app.get('/', (req, res) => {
  res.send("hello Adam")
});


app.listen(3001, () => {
  console.log("Server started on PORT 3001")
})

module.exports = app;