const Run = require('../models/runDetails');


exports.createRun = (req, res) => {
  const userID = req.user.userId;
  const { distance, duration } = req.body;
  
  const run = new Run({
    distance,
    duration,
    user: userID
  });

  run.save()
  .then(savedRun => {
    console.log("Run succesfully created:", run);
    res.status(201).json(savedRun);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: "Failed to save run"})
  })
}