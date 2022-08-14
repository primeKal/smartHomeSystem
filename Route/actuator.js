const express = require('express');
const router = express.Router();

const Actuatordb = require('../Transaction/actuatordb');



// fetch all Actuators
router.get('/', (req, res) =>{
    console.log('this is the user objects', req.user)
    Actuatordb.getAll().then((result)=>{
        res.send(result);
        
    })
});



// save a single actuator
router.post('/', (req, res) =>{
    // we will get the data here

    let actuator = {
        'name': req.body.name,
        'isOn' : req.body.isOn,
        'isAnalog' : req.body.isAnalog,
        'digitalData' : req.body.digitalData,
        'analogData' : req.body.analogData,       
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

