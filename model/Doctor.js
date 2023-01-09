var HospitalEmployee = require('./HospitalEmployee.js');
const fs = require('fs');
const csvParse= require('csv-parse').parse;
let reqPath = path.join(__dirname,'..', 'db_data','doctor','doctors.csv');

class Doctor extends HospitalEmployee {
    constructor(name,dob,gender,email,phone,language,certifications,speciality,password="default"){
        
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language,certifications);
        this.doctorId = phone+name;
        this.speciality = speciality;
        this.password =  password;

    }
    //getPatients(), updatePatientRecord(), writePrescription(), cancelAppointment()
    
    getId(){
        return this.doctorId;
    }
    static async findByName(name) {
        return new Promise((resolve, reject) => {
          const doctors = [];
          fs.createReadStream(reqPath)
            .pipe(csvParse({ delimiter: ',', relax_quotes: true }))
            .on('data', row => {
                doctors.push(new Doctor(row[0], row[1], row[2],row[3],row[4],row[5],row[7],row[8]));
            })
            .on('end', () => {
              // Find the patient with the specified name
              const doctor = doctors.find(d => d.name === name);
              if (doctor) {
                resolve(doctor);
              } else {
                reject(new Error(`Patient with name ${name} not found`));
              }
            });
        });
      }

}

module.exports = Doctor;

