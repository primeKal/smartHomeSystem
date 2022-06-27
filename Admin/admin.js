const express = require('express');
const { route } = require('../Route/actuator');

const Userdb = require('../Transaction/userdb')
const router = express.Router();

router.get('/login_page', (req, res) => {
    // res.sendFile('__dirname'+'/Admin/Pages/login.html');
    res.render('login');
});
router.post('/login_admin', (req, res) => {
    const name = req.body.name;
    const pwd = req.body.pwd;

    console.log(name, '-----', pwd, '-----', req.body);
    //chcking data base
    Userdb.getUser(name).then((user) => {
        console.log('got user from data base :', user);
        if (user) {
            console.log('checking the password', pwd, user['password'],);
            if (user['password'] == pwd) {
                console.log('password matchs');
                Userdb.getAllUsers().then((users) => {
                    console.log('from db users :', users);
                    res.render('index', { users: users });
                });
            }
        }
        else {
            res.send('wrong pwd');
        }
    });

});
router.get('/create_user_page', (req, res) => {
    //here we will return a create user page
    res.render('create_user');
});
router.post('/create', (req, res) => {
    user_model = req.body;
    console.log(user_model);
    hardware_model = {
        arduino_name: user_model.hardware_name,
        mac_address: user_model.mac_address,
        local_ip: user_model.local_ip,
        description: user_model.description
    }
    user_model.hardware = hardware_model;
    console.log('hardware is', hardware_model);
    console.log('merged model', user_model);
    Userdb.createUser(user_model).then((user) => {
        res.send(user);
    });
});

module.exports = router

