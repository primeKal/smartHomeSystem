const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name : {type : String , required : true}, 
    phoneNumber : Number,
    // images : [ String ],
    date : { type : Date, default : Date.now()},
    descritpion : String,
    address : String, 
    password : String,
    bio : String,
    social : [String],
    longitude : String,
    latitude : String,
    hardware : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Hardware'
    },
});

const Users = mongoose.model('User', userSchema);

async function getAll(){
    var users = await Users.find({}).populate('hardware');
    console.log('db method', users)
    return users;
}

async function getUser(name){
    var user = await Users.find( { "name" : name}).populate('hardware');
    console.log(user,'thisisitem');
    return user;
}
async function getUserById (id) {
    var user = await Users.find( { "_id" : id}).populate('hardware');
    console.log(user,'thisisitem');
    return user;
}

async function createUser (model) {
    var name = model.name;
    var phoneNumber = model.number;
    var social = model.social;
    var descritpion = model.descritpion;
    var address = model.address;
    var password = model.password;
    var bio = model.bio;
// here we will add the numbeer of sensor and actuator fields plus 
//actuator and sensor fields of referneceing array
    const user = new Users({
        name : name,
        phoneNumber : phoneNumber ,
        socail : social ,
        descritpion : descritpion,
        address : address,
        password : password ,
        bio : bio ,
    });
    const result = await user.save();
    console.log('result', result);
    return result;
}
async function setUserHardware(userid, hardwareId){
    const result = await Users.findByIdAndUpdate(userid, {
        hardware : hardwareId
    });
    return result;
}
module.exports.createUser = createUser;
module.exports.getAllUsers = getAll;
module.exports.getUser = getUser;
module.exports.getUserById = getUserById;
module.exports.setUserHardware = setUserHardware;










