const EventEmitter = require("events");

class HardwareManager extends EventEmitter {
    constructor() {
        super();
    }
    send_command() {
// here we will send the command to on or off acctuator by getting the 
// ip address from accoscciated user and deciding wether it is fan or led
    }
    set_nfc () {
// here we will receive the nfc unlocked and command corresponding 
    }
}
module.exports = HardwareManager;