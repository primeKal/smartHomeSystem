require('dotenv').config();


const User = require('./Transaction/userdb')

const mongoose = require('mongoose')
const express = require('express');
const jwt = require('jsonwebtoken');
const req = require('express/lib/request');
var bodyParser   = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(express.json());
// app.use(express.urlencoded({ extended : true }));
app.use(express.static('Public'));
app.set("view engine", "ejs");


const adminRoute = require('./Admin/admin')

mongoose.connect('mongodb://localhost/smartHomeSystem', (err) => {
    console.log(err);
    console.log('connected succesfully');
})


app.post('/login',(req, res)=>{
//authenticate

    var refreshTokens = [] ;
    const name = req.body.username;
    console.log("love",name);
    User.getUser(name).then((result)=>{
        console.log(result);
        if (!result[0]) { res.sendStatus(401); return ; }
        const user = {
            userId : result[0].name
        }
        console.log(user);
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '1hr'});
        const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_REFRESH)
        console.log(accessToken,refreshToken,"lovee")
        res.json({ accessToken : accessToken,
                    refreshToken : refreshToken })

    });
    
})
app.post('/token', (req, res)=>{
    const authHeader = req.headers['authorization']
    console.log(req.headers['authorization'])
    const refreshtoken = authHeader && authHeader.split(' ') [1];
    if (refreshtoken == null) res.sendStatus(401);
    jwt.verify(refreshtoken, process.env.ACCESS_TOKEN_REFRESH,
        (err, user) => {
            if (err) res.sendStatus(401);
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '1hr'});
            res.json({
                accessToken : accessToken
            });
        });
})
app.use('/admin',adminRoute);


var port = process.env.PORT  ;
if (port == undefined) { port = 4000; }
console.log(port);
app.listen(port, ()=>{
    console.log('Listening on port ' + port);
});
