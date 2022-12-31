var Person = require('./Person.js');

class Patient extends Person {

    constructor(name,dob,gender,email,phone,language,password, medicalhistory){
        
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language);
        this.patientId = phone+name;
        this.password=password;
        this.medicalhistory = medicalhistory;

    }

    //bookAppointment() , cancelAppointment, registerPatient()

}
module.exports = Patient;