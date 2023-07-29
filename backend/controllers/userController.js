const User = require("../models/user")


exports.createUser = (req, res) => {
  const { username, email, password, dateOfBirth, height, weight } = req.body;

  // Create a new user instance based on the User schema
  const user = new User({
    username,
    email,
    password,
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

