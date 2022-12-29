class HospitalEmployee {
    constructor(name) {
      this._name = name;
      this._remainingVacationDays = 20;
    }
    
    get name() {
      return this._name;
    }
    
    get remainingVacationDays() {
      return this._remainingVacationDays;
    }
    
    takeVacationDays(daysOff) {
      this._remainingVacationDays -= daysOff;
    }
    
    static generatePassword() {
      return Math.floor(Math.random() * 10000);
    }
  }
  
  class Nurse extends HospitalEmployee {
    constructor(name, certifications) {
      super(name);
      this._certifications = certifications;
    } 
    
    get certifications() {
      return this._certifications;
    }
    
    addCertification(newCertification) {
      this.certifications.push(newCertification);
    }
  }
  
  class Doctor extends HospitalEmployee{
    constructor(name, remainingVacationDays, insurance) {
      super(name);
      this._remainingVacationDays = remainingVacationDays;
      
    }
    get remainingVacationDays () {
      return this._remainingVacationDays;
    }
    get insruance() {
      return this._insurance;
    }
    takeVacationDays() {
      return this._remainingVacationDays;
    }
  }
  
  const nurseOlynyk = new Nurse('Olynyk', ['Trauma','Pediatrics']);
  nurseOlynyk.takeVacationDays(5);
  console.log(nurseOlynyk.remainingVacationDays);
  nurseOlynyk.addCertification('Genetics');
  console.log(nurseOlynyk.certifications);
  
  const doctorPhillips = new Doctor('Phillips',20, true);
  console.log()
  /*
  create a Doctor class that inherits from HospitalEmployee. The properties and methods for the Doctor class are listed below:
  DOCTOR
  properties: _name, _remainingVacationDays (set to 20 inside constructor()), _insurance
  methods: .takeVacationDays()
  */