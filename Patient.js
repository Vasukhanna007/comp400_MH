var Person = require('./Person.js');
path = require('path')
const fs = require('fs');
const csvParse = require('csv-parse').parse;
let reqPath = path.join(__dirname, 'db_data','patient','patients.csv');
console.log("Patient js ",reqPath)


class Patient extends Person {

    constructor(name,dob,gender,email,phone,language,password="default", medicalHistory){
        //'super' calls the parent constructor
        super(name,dob,gender,email,phone,language);
        this.patientId = phone;
        this.password=password;
        this.medicalHistory = medicalHistory;

    }

    //bookAppointment() , cancelAppointment, registerPatient()

    static async findByName(name) {
        return new Promise((resolve, reject) => {
          const patients = [];
          fs.createReadStream(reqPath)
            .pipe(csvParse({ delimiter: ',', relax_quotes: true }))
            .on('data', row => {
              patients.push(new Patient(row[0], row[1], row[2],row[3],row[4],row[5],row[7],row[8]));
            })
            .on('end', () => {
              // Find the patient with the specified name
              const patient = patients.find(p => p.name === name);
              if (patient) {
                resolve(patient);
              } else {
                reject(new Error(`Patient with name ${name} not found`));
              }
            });
        });
      }

}
module.exports = Patient;