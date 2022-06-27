require('dotenv').config();

const actuator = require('./Route/actuator');
const user = require('./Route/user'); 

const HardwareManager = require('./Events/automation')

const jwt = require('jsonwebtoken');
const request = require('express/lib/request');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


mongoose.connect('mongodb://localhost/smartHomeSystem', (err) => {
    console.log(err);
    console.log('connected succesfully');
})
app.use(express.urlencoded({ extended : true }));
app.use('/public',express.static('Public'));
app.use(express.json())


// app.use('/api/user',atheticate, user);
app.use('/api/user',user);
app.use('/api/actuator',actuator)

function atheticate(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(req.headers['authorization'])
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token',token);
    if (token == null) {res.sendStatus(401); console.log('not working'); return ;}
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if (err) {res.sendStatus(403); console.log('not'); console.log("err is",err); return ;}
        req.user = user
        console.log("user is",user) 
        next()
    })

}
io.on('connection', (socket) => {
    console.log('a user connected');
  });

var harware = new HardwareManager()
harware.on('save temprature' , (user_id, value)=>{
    console.log('caught  save Temprature event from server',user_id);
    //here we will check the user of the connected user and emit with socket io
    // if req.body.user_id == user_id
    io.emit('temp value', { temp : value });
});
harware.on('nfc unlocked' , (user_id)=>{
    console.log('caught  NFC event from server', user_id);
});

var port = process.env.PORT  ;
if (port == undefined) { port = 3000; }
console.log(port);
server.listen(port, ()=>{
    console.log('Listening on port ' + port);
});
