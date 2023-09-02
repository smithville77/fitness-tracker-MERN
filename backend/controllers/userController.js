require('dotenv').config();
const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
  const { username, email, password, dateOfBirth, height, weight } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  // Create a new user instance based on the User schema
  const user = new User({
    username,
    email,
    password: hashedPassword,
    dateOfBirth,
    height,
    weight
  });
  user.save()
  .then((savedUser) => {
    console.log("User successfully created", savedUser);
    // Send a response to the client if needed
    res.status(201).json(savedUser);
  })
  .catch((error) => {
    console.log(error);
    // Send an error response to the client if needed
    res.status(500).json({ error: "Failed to create user" });
  });
};


//get user by username // usernames should be unique
exports.getUser = (req, res) => {
  const username = req.params.username;
  console.log("requested name: " + username)
  
  User.findOne({ username })
  
  .then((user) => {
    console.log("user found: " + username)
    if(!user) {
      return res.status(404).json({error: "User not found"})
    }
    res.json(user)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: "Failed to get user"})
  })
}

// get user by ID
exports.getUserByID = (req, res) => {
  const userID = req.params.id;
  console.log("requested name: " + userID);
  
  User.findById(userID)
    .then((user) => {
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      console.log("user found: " + user.username);
      res.json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to get user" });
    });
};



// login route
exports.userLogin = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
  .then((user) => {

    if (!user) {
      return res.status(404).json({ error: "User not found"})
    } 
    
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if(err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
      }

      if(!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
          expiresIn: '1h' 
          });

          // Send the token to the client
          res.json({ token });
          
        });
      })
      .catch((error) => {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
    
}