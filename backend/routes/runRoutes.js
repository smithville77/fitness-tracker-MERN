const express = require('express');
const router = express.Router();

const RunController = require("../controllers/runController");

router.post("/newrun", RunController.createRun);


module.exports(router)
