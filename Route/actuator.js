const express = require('express');
const router = express.Router();

const Actuatordb = require('../Transaction/actuatordb');



// fetch all Actuators
router.get('/', (req, res) =>{
    console.log('this is the user objects', req.user)
    Actuatordb.getAll(req.body.user_id).then((result)=>{
        res.send(result);
    })
});



// save a single actuator
router.post('/', (req, res) =>{
    // we will get the data here

    let actuator = {
        'name': req.name,
        'isOn' : req.isOn,
        'isAnalog' : req.isAnalog,
        'digitalData' : req.digitalData,
        'analogData' : req.analogData,       
        'user' : req.body.user_id
    }
    Actuatordb.createActuator(actuator).then((result) =>{
        res.send(result);
    })
})
// get a single actuator
router.get('/:id', (req, res)=>{
    Actuatordb.getActuator(req.params.id).then((result)=>{
        res.send(result);
    });
})

module.exports = router

