const mongoose = require('mongoose');

const actuatorSchema = mongoose.Schema({
    name : {type : String , required : true}, 
    isAnalog : Boolean,
    isOn : Boolean, 
    date : { type : Date, default : Date.now()},
    digitalData : Boolean,
    analogData : [String], 
    type : [String],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
});

const Actuators = mongoose.model('Actuator', actuatorSchema);

async function getAll(user_id){
    var actuators = await Actuators.find({"user" : user_id });
    console.log('db method', actuators)
    return actuators;
}

async function getActuator(id){
    var actuator = await Users.find( { "id" : id}).populate();
    console.log(actuator,'thisisitem');
    return actuator;
}

async function createActuator (model) {

    const actuator = new Actuators({
        name : model.name,
        isAnalog : model.isAnalog ,
        isOn : model.isOn ,
        digitalData : model.digitalData,
        analogData : model.analogData,
        user : model.user,
    });
    
    const result = await actuator.save();
    console.log('result', result);
    return result;
}

module.exports.createActuator = createActuator;
module.exports.getActuator = getActuator;
module.exports.getAll = getAll;



