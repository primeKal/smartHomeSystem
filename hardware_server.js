// Here we will add 
//1. HTTP hundlers for commanding the arduino
//2. HTTP hundlers for receving data from arduino

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const jwt = require('jsonwebtoken');
const request = require('express/lib/request');
const app = express();

mongoose.connect('mongodb://localhost/smartHomeSystem', (err) => {
    console.log(err);
    console.log('connected succesfully');
})
app.use(express.urlencoded({ extended : true }));
app.use('/public',express.static('Public'));
app.use(express.json());

var events = require('events');
var eventEmitter = new events.EventEmitter();

// Receive Motion Sensor

app.get('/motiondetected/:user',(req,res)=>{
    //we get the user name from the request
    //emit the event with the user name we get
    user_id = req.body.user_id;
    eventEmitter.emit('motion detected', uiser_id)
    res.sendStatus(200);
});
app.get('/temp/:user',(req,res)=>{
    //we get the user name from the request
    //emit the event with the user name we get
    user_id = req.body.user_id;
    eventEmitter.emit('save temprature', uiser_id), value
    res.sendStatus(200);
});
app.get('/unlock/:user',(req,res)=>{
    //we get the user name from the request
    //emit the event with the user name we get
    user_id = req.body.user_id;
    eventEmitter.emit('nfc unlocked', uiser_id)
    res.sendStatus(200);
});
app.get('/command/:user', (req, res)=>{
    //get the user from database
    user = req.body.user_id;
    //get acctuator and ceck its type
    acctuator_id = req.body.acctuator_id
    if ( acctuator_id.type == 'fan' ) {
        //send http request to user ip with the fan or led
        res.sendStatus(200);
    }
})



var port = process.env.PORT  ;
if (port == undefined) { port = 5000; }
console.log(port);
app.listen(port, ()=>{
    console.log('Listening on port ' + port);
});
