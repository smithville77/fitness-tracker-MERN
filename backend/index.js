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




const port = 3001;

app.use(express.json());


let codeVerifier;
const crypto = require('crypto');

// Function to generate a random code verifier
function generateCodeVerifier() {
  const codeVerifierLength = 128; // Length of the code verifier (minimum 43 characters)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  codeVerifier = '';

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
const fitbitRedirectUri = 'https://ed8d-58-108-98-222.ngrok-free.app/callback';
const fitbitScopes = 'activity cardio_fitness electrocardiogram heartrate location nutrition oxygen_saturation profile respiratory_rate settings sleep social temperature weight';

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

// Define a success route
app.get('/success', (req, res) => {
  // You can customize this response to display a success message or render a success page
  res.status(200).send('Success! Your request was processed successfully.');
});

// Define an error route
app.get('/error', (req, res) => {
  // You can customize this response to display an error message or render an error page
  res.status(500).send('Error! Something went wrong on the server.');
});


let accessToken;






let accessTokenPromise = null;

app.get('/callback', async (req, res) => {
  console.log("Reached the /callback route");
  const { code } = req.query;
  console.log(code);
  try {
    const tokenRequestData = new URLSearchParams();
    tokenRequestData.append('client_id', fitbitClientId);
    tokenRequestData.append('grant_type', 'authorization_code');
    tokenRequestData.append('code', code);
    tokenRequestData.append('redirect_uri', fitbitRedirectUri);
    tokenRequestData.append('code_verifier', codeVerifier);

    const tokenResponse = await axios.post(
      'https://api.fitbit.com/oauth2/token',
      tokenRequestData,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${fitbitClientId}:${fitbitClientSecret}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const newAccessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    // Store the tokens securely, e.g., in a database or session
    
    // Resolve the promise with the new access token before redirecting
    accessTokenPromise = Promise.resolve(newAccessToken);

    // Redirect the user to a success page or perform further actions
    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.redirect('/error'); // Redirect to an error page if there's an issue
  }
});



// async function makeApiRequest(accessToken) {
//   try {
//     const apiUrl = 'https://api.fitbit.com/2/user/-/profile.json';

//     const response = await axios.get(apiUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const profileData = response.data;
//     response.json({ profileData });
//   } catch (error) {
//     console.error('Error making API request:', error);
//     response.status(500).json({ error: 'Internal server error' });
//   }
// }

app.get('/profile', async (req, res) => {
  try {
    // Wait for the promise to resolve and get the access token
    const accessToken = await accessTokenPromise;
    console.log('Access Token:', accessToken);

    if (accessToken) {
      const apiUrl = 'https://api.fitbit.com/2/user/-/profile.json';
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const profileData = response.data;

      // Send the profile data in the response
      res.json({ profileData });
    } else {
      // Handle the case when accessToken is null
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error making API request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

