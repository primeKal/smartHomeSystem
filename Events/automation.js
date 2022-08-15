const events = require("events");

var eventEmitter = new events.EventEmitter();
// var HardwareManager = require('./Events/automation');


class HardwareManager extends events.EventEmitter {
    constructor() {
        super();
    }
    send_command(type) {
        // here we will send the command to on or off acctuator by getting the 
        // ip address from accoscciated user and deciding wether it is fan or led
        
    }
    set_nfc() {
        // here we will receive the nfc unlocked and command corresponding 
    }
    set_temp() {
        // here we will receive the nfc unlocked and command corresponding 
        console.log('saving to database that new tempratue is here');
    }
    set_motion_detected() {
        // here we will receive the nfc unlocked and command corresponding 
        console.log('saving to database that motion is detected is here');
    }
    async service(){

}
}
// var eventEmitter = new HardwareManager();

module.exports = HardwareManager;