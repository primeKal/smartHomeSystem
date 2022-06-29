const mongoose = require('mongoose');

const hardWare = mongoose.Schema({
    arduino_name: { type: String, required: true },
    mac_address: Number,
    local_ip: Number,
    date: { type: Date, default: Date.now() },
    descritpion: String,
    isOn: { type : Boolean, default: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    // power : String,
    // voltage : String,
    // social : [String]
});

const Hardwares = mongoose.model('Hardware', hardWare);

// methods for fetching hardware object

async function getAllHardwares() {
    var hardWares = await Hardwares.find();
    console.log('db method', hardWares)
    return hardWares;
}

async function getHardwareByIp(ip) {
    var hardware = await Hardwares.find({ "local_ip": ip });
    console.log(hardware, 'this is hardware item ');
    return hardware;
}
async function getHardwareById(id) {
    var hardware = await Hardwares.find({ "_id": id });
    console.log(hardware, 'this is hardware item ');
    return hardware;
}

async function createHardware(model) {
    if (!model.user) { return "No user specified Please specifiy user" ; }
    var arduino_name = model.arduino_name;
    var mac_address = model.number;
    var local_ip = model.local_ip;
    var date = model.date;
    var descritpion = model.descritpion;
    var isOn = model.isOn;
    var user = model.user;
    console.log('final Hardware to be saved', model)

    const hardware = new Hardwares({
        arduino_name: arduino_name,
        mac_address: mac_address,
        descritpion: descritpion,
        local_ip: local_ip,
        isOn: isOn,
        date: date,
        user: user
    });
    const result = await hardware.save();
    // dont forget to call set user hardware method here
    console.log('result', result);
    return result;
}

module.exports.createHardware = createHardware;
module.exports.getAllHardwares = getAllHardwares;
module.exports.getHardwareByIp = getHardwareByIp;
module.exports.getHardwareById = getHardwareById;