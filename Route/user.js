const express = require('express');
const router = express.Router();

const Userdb = require('../Transaction/userdb');


// fetch all users
router.get('/', (req, res) =>{
    console.log('getting started');
    console.log('this is the user objects', req.user)
    Userdb.getAllUsers().then((result)=>{
        res.send(result);
    })
});



// save a single user
router.post('/', (req, res) =>{
    // we will get the data here
    const name = req.body.name;
    const bio = req.body.bio;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const address = req.body.address;
    const social = req.body.social;
    const description = req.body.description;

    let userObj = {
        'name': name,
        'phoneNumber' : phoneNumber,
        'description' : description,
        'password' : password,
        'address' : address,
        'social' : social,
    }
    Userdb.createUser(userObj).then((result) =>{
        res.send(result);
    })
})
// get a single user
router.get('/:id', (req, res)=>{
    Userdb.getUserById(req.params.id).then((result)=>{
        res.send(result);
    });
})

module.exports = router

