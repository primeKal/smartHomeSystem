const express = require('express');
const router = express.Router();

const SensorDb = require('../Transaction/sensordb');



// fetch all Sensors
router.get('/', (req, res) =>{
    console.log('this is the user objects', req.user)
    SensorDb.getAll().then((result)=>{
        res.send(result);
    })
});



// save a single sensor
router.post('/', (req, res) =>{
    // we will get the data here
    console.log(req.data)
    let sensor = {
        'name': req.body.name,
        'isOn' : req.body.isOn,
        'isAnalog' : req.body.isAnalog,
        'digitalData' : req.body.digitalData,
        'analogData' : req.body.analogData,       
        'user' : req.body.user_id
    }
    console.log(sensor);
    SensorDb.createSensor(sensor).then((result) =>{
        res.send(result);
    })
})
// get a single sensor by id
router.get('/:id', (req, res)=>{
    SensorDb.getByUser(req.params.id).then((result)=>{
        res.send(result);
    });
})

module.exports = router

