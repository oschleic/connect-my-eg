const jwt = require("jsonwebtoken");
var express = require('express')
require('dotenv').config()
var bodyParser = require('body-parser')
var router = express.Router()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/auth', urlencodedParser, async (req, res) => {
  const token = req.headers["authorization"]; ;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    return res.status(200).json({success: true, message: "Token is valid", token})
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
      
})


module.exports = {
  router,
};
