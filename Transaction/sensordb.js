const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    name : {type : String , required : true}, 
    isAnalog : Boolean,
    isOn : Boolean, 
    date : { type : Date, default : Date.now()},
    analogData : [String], 
    type : String,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
});

const Sensors = mongoose.model('Sensor', sensorSchema);

async function getByUser(user_id){
    var sensors = await Sensors.find({"user" : user_id });
    console.log('db method', actuators)
    return sensors;
}

async function getSensor(id){
    var sensor = await Sensors.find( { "id" : id}).populate();
    console.log(sensor,'thisisitem');
    return sensor;
}
async function getByName(name){
    var sensor = await Sensors.findOne( { "name" : name}).populate();
    console.log(sensor,'thisisitem');
    return sensor;
}
async function getAll(){
    var sensors = await Sensors.find();
    console.log(sensors);
    return sensors;
}
async function updateSensorCommand( id , value){
    const time = Date.now();
    let data = String(time) + value
    const result = Sensors.findByIdAndUpdate(
        {_id: id },
        { $set: { analogData: data }},
        { new : true}
     );
     return result;
}

async function createSensor (model) {

    const sensor = new Sensors({
        name : model.name,
        isAnalog : model.isAnalog ,
        isOn : model.isOn ,
        // digitalData : model.digitalData,
        analogData : model.analogData,
        user : model.user,
    });
    
    const result = await sensor.save();
    console.log('result', result);
    return result;
}

module.exports.createSensor = createSensor;
module.exports.getSensor = getSensor;
module.exports.getByUser = getByUser;
module.exports.updateSensorCommand = updateSensorCommand;
module.exports.getAll = getAll;
module.exports.getByName = getByName;


