// Here we will add 
//1. HTTP hundlers for commanding the arduino
//2. HTTP hundlers for receving data from arduino

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const axios = require('axios');
const HardwareDb = require('./Transaction/hardwaredb');
const jwt = require('jsonwebtoken');
const request = require('express/lib/request');
const app = express();

mongoose.connect('mongodb://localhost/smartHomeSystem', (err) => {
    console.log(err);
    console.log('connected succesfully');
})
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('Public'));
app.use(express.json());

var events = require('events');
// var eventEmitter = new events.EventEmitter();
var HardwareManager = require('./Events/automation');
var eventEmitter = new HardwareManager();
// Receive Motion Sensor

app.get('/motiondetected', (req, res) => {
    //we get the user name from the request
    //emit the event with the user name we get
    const user_id = req.body.user_id;
    eventEmitter.emit('motion detected', user_id)
    res.sendStatus(200);
});
app.get('/temp', (req, res) => {
    //we get the user name from the request
    //emit the event with the user name we get
    const user_id = req.body.user_id;
    const value = req.body.vale;
    eventEmitter.emit('save temprature', user_id, value);
    res.sendStatus(200);
});
app.get('/unlock', (req, res) => {
    //we get the user name from the request
    //emit the event with the user name we get
    const user_id = req.body.user_id;
    eventEmitter.emit('nfc unlocked', user_id)
    res.sendStatus(200);
});
app.get('/command', (req, res) => {
    //get the user from database
    user = req.body.user_id;
    //get acctuator and check its type
    const acctuator_id = req.body.acctuator_id
    const hardware_id = req.body.hardware_id;
    HardwareDb.getHardwareById(hardware_id).then((result) => {
        console.log('we got the hardware>Ip_address');
        const ip = "https://" + result.ip_address;
        console.log(ip);
            // axios
            //     .post(ip, {
            //         id: result._id ,
            //         type : result.type,
            //     })
            //     .then(res => {
            //         console.log(`statusCode: ${res.status}`);
            //         console.log(res);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });

    });
});

var port = process.env.PORT;
if (port == undefined) { port = 5000; }
console.log(port);
app.listen(port, () => {
    console.log('Listening on port ' + port);
});
module.exports.common_emmiter = eventEmitter;
