var Person = require('./Person.js');

class Patient extends Person {

    constructor(name,dob,gender,email,phone,language,password="default", medicalHistory){
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language);
        this.patientId = phone;
        this.password=password;
        this.medicalHistory = medicalHistory;

    }

    //bookAppointment() , cancelAppointment, registerPatient()

}
module.exports = Patient;