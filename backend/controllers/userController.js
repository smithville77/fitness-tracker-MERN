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




// exports.getUserByID = (req, res) => {
//   const userID = req.params.id;
//   console.log("Requested user ID:", userID);

//   // Remove 'objectId(' and ')' from the ID to extract the hexadecimal string
//   const hexStringID = userID.replace(/objectId\(|\)/g, '');

//   // Convert the hexadecimal string to an ObjectId
//   const mongooseID = mongoose.Types.ObjectId(hexStringID);

//   User.findById(mongooseID)
//     .then((user) => {
//       if (!user) {
//         console.log("User not found");
//         return res.status(404).json({ error: "User not found" });
//       }
//       console.log("Found user:", user.username);
//       res.json(user);
//     })
//     .catch((error) => {
//       console.log("Error:", error);
//       res.status(500).json({ error: "Failed to get user" });
//     });
// };

