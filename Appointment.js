var patient = require('./Patient.js');
var doctor = require('./Doctor.js');


class Appointment{
    constructor(patient,doctor,date,time){
        this.patient = patient;
        this.doctor = doctor;
        this.date = date;
        this.time =time;
        this.appointmentId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}

module.exports = Appointment;