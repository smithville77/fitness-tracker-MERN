require('dotenv').config();

const express = require("express");
const axios = require('axios');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

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

// const corsOptions = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// };

app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use("/exercise", runRoutes);

// const fitbitClientId = process.env.FB_CLIENT_ID;
// const fitbitClientSecret = process.env.FB_CLIENT_SECRET;
// const fitbitRedirectUri = 'http://localhost:3000/callback';
// const fitbitScopes = 'activity heartrate profile';

// app.get('/auth/fitbit', cors(corsOptions), (req, res, next) => {
//   console.log('Reached /fitbit route');
//   // Construct the Fitbit authorization URL
//   const fitbitAuthUrl = 'https://www.fitbit.com/oauth2/authorize?' +
//     `response_type=code&` +
//     `client_id=${fitbitClientId}&` +
//     `redirect_uri=${fitbitRedirectUri}&` +
//     `scope=${fitbitScopes}`;

//   // Redirect the user to Fitbit for authorization
//   res.redirect(fitbitAuthUrl);
// });

// app.get('/auth/fitbit/callback', async (req, res) => {
//   const { code } = req.query;

//   try {
//     const tokenRequestData = {
//       client_id: fitbitClientId,
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: fitbitRedirectUri,
//     };

//     const response = await axios.post('https://api.fitbit.com/oauth2/token', null, {
//       params: tokenRequestData,
//       headers: {
//         Authorization: `Basic ${Buffer.from(`${fitbitClientId}:${fitbitClientSecret}`).toString('base64')}`,
//       },
//     });

//     const accessToken = response.data.access_token;
//     const refreshToken = response.data.refresh_token;

//     res.redirect('/auth/fitbit/success');
//   } catch (error) {
//     console.error(error);
//     res.redirect('/auth/fitbit/error');
//   }
// });

// app.listen(3001, () => {
//   console.log("Server started on PORT 3001");
// });



const port = 3001;

app.use(express.json());



const crypto = require('crypto');

// Function to generate a random code verifier
function generateCodeVerifier() {
  const codeVerifierLength = 128; // Length of the code verifier (minimum 43 characters)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let codeVerifier = '';

  for (let i = 0; i < codeVerifierLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    codeVerifier += characters.charAt(randomIndex);
  }

  return codeVerifier;
}

// Function to generate the code challenge from the code verifier
function generateCodeChallenge(codeVerifier) {
  const codeChallenge = base64URLEncode(sha256(codeVerifier));
  return codeChallenge;
}

// Helper function to calculate the SHA-256 hash of a string
function sha256(input) {
  return crypto.createHash('sha256').update(input).digest();
}

// Helper function to convert a buffer to base64 URL-safe format
function base64URLEncode(buffer) {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

module.exports = {
  generateCodeVerifier,
  generateCodeChallenge,
};


const fitbitClientId = '23RF4V';
const fitbitClientSecret = '73a73bf8526e1bea2a0189cf6c3b674f';
const fitbitRedirectUri = 'http://localhost:3000/callback';
const fitbitScopes = 'activity heartrate profile';

app.get('/auth/fitbit', cors(corsOptions), async (req, res, next) => {
  try {
    // Generate PKCE values (codeVerifier and codeChallenge)
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    // Create authorization URL with code challenge
    const authUrl = `https://www.fitbit.com/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${fitbitClientId}&` +
      `redirect_uri=${fitbitRedirectUri}&` +
      `scope=${fitbitScopes}&` +
      `code_challenge=${codeChallenge}&` +
      `code_challenge_method=S256`;

    res.json({ authorizationUrl: authUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/callback', (req, res) => {
  const { code, state } = req.query;
  
  if (state !== expectedState) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }

  try {
    // Exchange the authorization code for tokens
    const response = axios.post('https://api.fitbit.com/oauth2/token', null, {
      params: {
        client_id: fitbitClientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: fitbitRedirectUri,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${fitbitClientId}:${fitbitClientSecret}`).toString('base64')}`,
      },
    });

    // Extract access token and optionally refresh token from the response
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Store the tokens securely, e.g., in a database or session

    // Redirect the user to a success page or perform further actions
    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.redirect('/error'); // Redirect to an error page if there's an issue
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

