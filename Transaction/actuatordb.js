const mongoose = require('mongoose');

const actuatorSchema = mongoose.Schema({
    name : {type : String , required : true}, 
    isAnalog : Boolean,
    isOn : Boolean, 
    date : { type : Date, default : Date.now()},
    digitalData : Boolean,
    analogData : [String], 
    type : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
});

const Actuators = mongoose.model('Actuator', actuatorSchema);

async function getByUser(user_id){
    var actuators = await Actuators.find({"user" : user_id });
    console.log('db method', actuators)
    return actuators;
}
async function getByName(name){
    var actuators = await Actuators.findOne({"name" : name });
    console.log('db method', actuators)
    return actuators;
}
async function getAll(){
    var actuators = await Actuators.find();
    console.log(actuators);
    return actuators;
}


async function getActuator(id){
    var actuator = await Actuators.find( { "id" : id}).populate('user');
    console.log(actuator,'thisisitem');
    return actuator;
}
async function updateActuatorCommand( id , power){
    const time = Date.now();
    console.log('beggingin', time);
    const result = Actuators.findByIdAndUpdate(
        {_id: id },
        { $set: { analogData: time,
                    isOn : power}},
        { new : true}
     );
     return result;
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
module.exports.getByUser = getByUser;
module.exports.updateActuatorCommand = updateActuatorCommand;
module.exports.getAll = getAll;
module.exports.getByName = getByName;