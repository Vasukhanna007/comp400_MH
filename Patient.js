var Person = require('./Person.js');

class Patient extends Person {
    constructor(name,dob,gender,email,phone,language, medicalhistory){
        
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language);
        this.medicalhistory = medicalhistory;
    }

    //bookAppointment() , cancelAppointment, registerPatient()

}
module.exports = Patient;