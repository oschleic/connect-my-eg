require('dotenv').config()
const express = require('express')
const app = express()
const dev = require('./devConfig.json')
const path = require('path');
const bcrypt = require('bcrypt');
const port =  process.env.PORT || dev['backend-port']

var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
 // create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const pool = require('./db.js')
const jwt = require("jsonwebtoken");






const balena = require("./balena");
app.use('/device', balena);

const userAuth = require("./controller/UserController");
app.use(userAuth.router)


//Creating a new user
app.post('/signup', urlencodedParser, async function (req, res) {
    try{
        var email = req.body.email;
        var password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const ins = await pool.query('INSERT INTO users(email, password) VALUES ($1, $2)', [email, hashedPassword]);
        res.status(201).json({success: true, message: "New user successfully created!"})
        
    } catch(error){
        if(error.code == '23505'){
            res.status(409)
            res.json({success: false, error: "There is already an account associated with this email"})
        }
        else{
			console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            console.log(error);
            console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
            res.status(500);
            res.json({success: false, error: "There is already an account associated with this email"})
        }
    }
})

//Logging in an existing user
app.post('/login', urlencodedParser, async function (req, res) {
    try{
        var email = req.body.email;
        var password = req.body.password;
        const ins = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        var user = ins.rows[0];

        if (ins.rowCount > 0 && (await bcrypt.compare(password, ins.rows[0]['password']))) {
            const token = jwt.sign(
                { deviceName: ins.rows[0].deviceName, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
            res.status(200).json({token});
        }
        res.send("failed");
        
    } catch(error){
        res.status(500);
    }
})

app.get('*', (req, res) => {                      
  res.sendFile(path.resolve(__dirname,  "../client/build", 'index.html'));                               
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})