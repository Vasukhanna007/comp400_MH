var HospitalEmployee = require('./HospitalEmployee.js');

class Doctor extends HospitalEmployee {
    constructor(name,dob,gender,email,phone,language,certifications,speciality){
        
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language,certifications);
        this.doctorId = phone+name;

        this.speciality = speciality;

    }
    //updatePatientRecord(), writePrescription(), cancelAppointment()
    


}
module.exports = Doctor;

