const express = require('express');
const router = express.Router();

const HardwareDb = require('../Transaction/hardwaredb');


// fetch all hardwares
router.get('/', (req, res) =>{
    console.log('getting all hardwares');
    console.log('this is the hardware objects', req.user)
    HardwareDb.getAllHardwares().then((result)=>{
        res.send(result);
    })
});



// save a single hardware
router.post('/', (req, res) =>{
    // we will get the data here
    const arduino_name = req.body.arduino_name;
    const mac_address = req.body.mac_address;
    const local_ip = req.body.local_ip;
    const descritpion = req.body.descritpion;
    const isOn = req.body.isOn;
    const user_id = req.body.user_id;

    let hardwareObj = {
        'arduino_name': arduino_name,
        'mac_address' : mac_address,
        'description' : descritpion,
        'local_ip' : local_ip,
        'isOn' : isOn,
        'user' : user_id,
    }
    HardwareDb.createHardware(hardwareObj).then((result) =>{
        res.send(result);
    })
})
// get a single user
router.get('/:id', (req, res)=>{
    HardwareDb.getHardwareById(req.params.id).then((result)=>{
        res.send(result);
    });
});
router.get('/ip/:id', (req, res)=>{
    HardwareDb.getHardwareByIp(req.params.ip).then((result)=>{
        res.send(result);
    });
});

module.exports = router

