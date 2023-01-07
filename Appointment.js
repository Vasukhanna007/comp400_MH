var patient = require('./Patient.js');
var doctor = require('./Doctor.js');
const fs = require('fs');


class Appointment{
    constructor(patient,doctor,appointmentDate){
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDate = appointmentDate;
        this.appointmentId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    getPatient() {
        return this.patient;
      }
    
    getDoctor() {
        return this.doctor;
      }
    
    getAppointmentDate() {
        return this.appointmentDate;
      }

    toCsvString() {
        
    return `${this.appointmentId},${this.patient.name},${this.doctor.name},${this.appointmentDate}`;
    }

    save(destinationFile,appointment_str){
        fs.appendFileSync(destinationFile,appointment_str);
        fs.appendFileSync(destinationFile,'\n');
    }


}
//  bookAppointment(),  viewAppointment(), cancelAppointment(), notes()

module.exports = Appointment;