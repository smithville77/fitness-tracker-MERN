const jwt = require('jsonwebtoken');
const jwtToken = process.env.JWT_KEY

const authenticateUser = (req, res, next) => {
  //the "?" after authorisation is an optional chaining character which ensures the code doesnt throw an error in the authorisation header is missing or malformed. If the header is present and valid, splits it to get the actual token, by dropping the 'Bearer" portion
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, jwtToken); // Replace 'your-secret-key' with your actual secret key
    req.user = decodedToken; // Set the user information in req.user
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateUser;
