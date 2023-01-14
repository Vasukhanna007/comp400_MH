var Person = require('./Person.js');

class HospitalEmployee extends Person {
    constructor(name,dob,gender,email,phone,language,certifications){
        
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language);
        this.certifications = certifications;
        // this.remainingVacationDays = 14;


    }

    // get remainingVacationDays() {
    //     return this.remainingVacationDays;
    //   }
      
    //   takeVacationDays(daysOff) {
    //     this.remainingVacationDays -= daysOff;
    //   }

    //   get certifications() {
    //     return this.certifications;
    //   }


      
    //   addCertification(newCertification) {
    //     this.certifications.push(newCertification);
    //   }
}
module.exports = HospitalEmployee;