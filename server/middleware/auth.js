const jwt = require("jsonwebtoken");
var express = require('express')
require('dotenv').config()
var bodyParser = require('body-parser')
var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()
 // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]; ;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};




module.exports = verifyToken;
