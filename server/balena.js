var express = require('express')
var router = express.Router()
const auth = require("./middleware/auth");
var bodyParser = require('body-parser')
 // create application/x-www-form-urlencoded parser
 var urlencodedParser = bodyParser.urlencoded({ extended: false })
 require('dotenv').config()
var rp = require('request-promise');
const pool = require('./db.js')

/*Gets a device using balena API. If the user does not currently have a device,
the device is set in the database                                           */
router.post('/get', auth, urlencodedParser, async (req, res) => {
    var user = req.user;
    var name = user.deviceName || req.body.name;
    const options = {
        url: `https://api.balena-cloud.com/v5/device?\$filter=device_name%20eq%20'${name}'`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.BALENA_TOKEN}`,
        },
        credentials: "same-origin"
    };

    try{
        const device = await rp(options).json();
        if(device == null || device.d == null || device.d.length === 0){
            return res.status(400).json({error: `${name} is not a valid device, look at the card that came with your device`})
        }

        const ip = device.d[0].ip_address.split(" ")[0];
        if(user.deviceName == null || user.deviceName == 'null'){
            const ins = await pool.query('UPDATE users SET deviceName = $1 WHERE email = $2', [name, user.email]);
            return res.status(200).json({ip});
        }
        return res.status(200).json({ip});
    } catch(error){
        return res.status(500).json({error: `Server Error`});
    }
        
  })



module.exports = router;