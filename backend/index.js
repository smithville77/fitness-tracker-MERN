require('dotenv').config();

const express = require("express");
const axios = require('axios');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const router = express.Router();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');
const runRoutes = require('./routes/runRoutes');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Fitness Database Connected');
});

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use("/exercise", runRoutes);

const fitbitClientId = process.env.FB_CLIENT_ID;
const fitbitClientSecret = process.env.FB_CLIENT_SECRET;
const fitbitRedirectUri = 'http://localhost:3000/callback';
const fitbitScopes = 'activity heartrate profile';

app.get('/auth/fitbit', cors(corsOptions), (req, res, next) => {
  console.log('Reached /fitbit route');
  // Construct the Fitbit authorization URL
  const fitbitAuthUrl = 'https://www.fitbit.com/oauth2/authorize?' +
    `response_type=code&` +
    `client_id=${fitbitClientId}&` +
    `redirect_uri=${fitbitRedirectUri}&` +
    `scope=${fitbitScopes}`;

  // Redirect the user to Fitbit for authorization
  res.redirect(fitbitAuthUrl);
});

app.get('/auth/fitbit/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenRequestData = {
      client_id: fitbitClientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: fitbitRedirectUri,
    };

    const response = await axios.post('https://api.fitbit.com/oauth2/token', null, {
      params: tokenRequestData,
      headers: {
        Authorization: `Basic ${Buffer.from(`${fitbitClientId}:${fitbitClientSecret}`).toString('base64')}`,
      },
    });

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    res.redirect('/auth/fitbit/success');
  } catch (error) {
    console.error(error);
    res.redirect('/auth/fitbit/error');
  }
});

app.listen(3001, () => {
  console.log("Server started on PORT 3001");
});
