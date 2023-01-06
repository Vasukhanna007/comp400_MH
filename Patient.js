var Person = require('./Person.js');

class Patient extends Person {

    constructor(patientId,name,dob,gender,email,phone,language,password, medicalHistory){
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language);
        this.patientId = patientId;

        this.password=password;
        this.medicalHistory = medicalHistory;

    }

    //bookAppointment() , cancelAppointment, registerPatient()

}
module.exports = Patient;