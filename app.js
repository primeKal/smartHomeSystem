require('dotenv').config();

const actuator = require('./Route/actuator');

const HardwareDb = require('./Transaction/hardwaredb');
const ActuatorDb = require('./Transaction/actuatordb')

const user = require('./Route/user');
const hardware = require('./Route/hardware');
const sensor = require('./Route/sensor');

const Sensordb  = require('./Transaction/sensordb')
// const HardwareManager = require('./Events/automation');

const jwt = require('jsonwebtoken');
const request = require('express/lib/request');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const http = require('http');
const server = http.createServer(app);

const axios = require('axios').default;
const io = require("socket.io")(server);


mongoose.connect('mongodb://localhost/smartHomeSystem', (err) => {
    console.log(err);
    console.log('connected succesfully');
})
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('Public'));
app.use(express.json())

app.set("view engine", "ejs");
// app.use('/api/user',atheticate, user);
app.use('/api/user', user);
app.use('/api/actuator', actuator);
app.use('/api/hardware', hardware);
app.use('/api/sensor', sensor);

// app.use('/api/user',authenticate,user);
// app.use('/api/actuator',authenticate,actuator);
// app.use('/api/hardware', authenticate,hardware);


function authenticate(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(req.headers['authorization'])
    const token = authHeader && authHeader.split(' ')[1];
    console.log('token', token);
    if (token == null) { res.sendStatus(401); console.log('not working'); return; }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { res.sendStatus(403); console.log('not'); console.log("err is", err); return; }
        req.user = user
        console.log("user is", user)
        next()
    });
}
io.on('connection', (socket) => {
    console.log('a user connected');
});
const harwareManager = require('./hardware_server').common_emmiter;
console.log(harwareManager);
console.log(require('./hardware_server'));
// var harwareManager = new HardwareManager()
// harwareManager.on('save temprature' , (user_id, value)=>{
//     console.log('caught  save Temprature event from server',user_id);
//     //here we will check the user of the connected user and emit with socket io
//     // if req.body.user_id == user_id
//     harwareManager.set_temp();
//     io.emit('save temp', { temp : value });
// });
// harwareManager.on('nfc unlocked' , (user_id)=>{
//     harwareManager.set_nfc();
//     console.log('caught  NFC event from server', user_id);
//     io.emit('nfc unlocked', { });
// });
harwareManager.on('data fetched', (data) => {
    console.log(data);
    io.emit('data fetched', data);
});

setInterval( async () =>  {
    // console.log('data fetched');
    const data =await fetchData();
    const jsonData = JSON.stringify(data);
    console.log(jsonData)
    harwareManager.emit('data fetched', jsonData)
}, 2000)
async function fetchData() {
    const data   = {
        humiity: 'low',
        temperature: 23,
        motion: 'none',
        // presence: 'none',
        // nfc: 'locked',
        // water: 89,
        light1: false,
        // light2: true
    }
    return data;
    //  axios
    //         .post('http://192.168.137.151/data')
    //         .then(res => {
    //             console.log(`statusCode: ${res.status}`);
    //             console.log(res);
    //             // const data  {
    //             //     humiity : res.body.humiity,
    //             //     temperature: res.body.temperature,
    //             //     motion : res.body.motion,
    //             //     presence : res.body.presence,
    //             //     nfc : res.body.nfc,
    //             //     water : res.body.water
    //             // }
    //             return 'data';
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
}

app.post('/command', (req, res) => {
    var name = req.body.name;
    var status = req.body.status;
    console.log(name,status);
    console.log('dsfgdfs');
    switch (name) {
        case 'Light 1':
            callHardware(name, status)
            res.sendStatus(200);
            break;
        case 'Light 2':
            callHardware(name, status)
            res.sendStatus(200);
            break;
        default:
            callSensor(name, status);
            res.sendStatus(200);
            break;
    }
});
function callHardware(name, status) {
    ActuatorDb.getByName(name).then((result2) => {
        // const power = result2.isOn ? false : true ;
        const acctuator_id = result2._id
        ActuatorDb.updateActuatorCommand(acctuator_id, status).then(() => {
            console.log('hooray');
            // axios
            //     .post('', {
            //         name: name,
            //         status: status,
            //     })
            //     .then(res => {
            //         console.log(`statusCode: ${res.status}`);
            //         console.log(res);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
            //here we will send the data with axios
            res.sendStatus(200);
        });
    });
}
function callSensor(name, status) {
    console.log('erererr');
    Sensordb.getByName(name).then((result2) => {
        // const power = result2.isOn ? false : true ;
        const acctuator_id = result2._id
        console.log(result2)
        Sensordb.updateSensorCommand(acctuator_id, status).then(() => {
            console.log('hooray');
            // axios
            //     .post('', {
            //         name: name,
            //         status: status,
            //     })
            //     .then(res => {
            //         console.log(`statusCode: ${res.status}`);
            //         console.log(res);
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });
            //here we will send the data with axios
            res.sendStatus(200);
        });
    });
}

var port = process.env.PORT;
if (port == undefined) { port = 3000; }
console.log(port);
server.listen(port, '0.0.0.0', () => {
    console.log('Litening on port ' + port);
});
