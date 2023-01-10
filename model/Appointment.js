var patient = require('./Patient.js');
var doctor = require('./Doctor.js');
const fs = require('fs');
let reqPath = path.join(__dirname,'..' ,'db_data','appointment','appointments.csv');
const parse = require('csv-parse').parse;


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
      getPatientID() {
        return this.patient.patientId;
      }
    
    getDoctorID() {
        return this.doctor.doctorId;
      }
    
    getAppointmentDate() {
        return this.appointmentDate;
      }

      formatDate(dates){
        const date = new Date(dates);
        const formattedDate = date.toISOString().slice(0, 10);
        return formattedDate;
      }
      
    toCsvString() {
        
    return `${this.appointmentId},${this.getDoctorID()},${this.getPatientID()},${this.patient.email},${this.doctor.name},${this.formatDate(this.appointmentDate)}`;
    
  }


    static async getAppointmentsByDoctorName(doctorName){
      return new Promise((resolve, reject) => {
      appointments=[]

      fs.createReadStream(reqPath)
      .pipe(parse({ delimiter: ',', relax_quotes: true }))
      .on('data', row => {
        // Check if the doctor name in the row matches the given doctor name
        if (row[4] === doctorName) {
          // If it matches, add the appointment to the appointments array
          appointments.push({
            appointmentId: row[0],
            doctorID:row[1],
            patientID:row[2],
            patientName: row[3],
            doctorName: row[4],
            date:row[5]
          });
        }
      })
      .on('end', () => {
        // Send the appointments array as the response
        console.log(appointments)
        appointments = appointments;
        if (appointments) {
          resolve(appointments);
        } else {
          reject(new Error(`Patient with name ${apt} not found`));
        }
        
      });
    });
    }

    static async getAppointmentsByPatientEmail(patientEmail){
      return new Promise((resolve, reject) => {
      appointments=[]

      fs.createReadStream(reqPath)
      .pipe(parse({ delimiter: ',', relax_quotes: true }))
      .on('data', row => {
        // Check if the doctor name in the row matches the given doctor name
        if (row[3] === patientEmail) {
          // If it matches, add the appointment to the appointments array
          appointments.push({
            appointmentId: row[0],
            doctorID:row[1],
            patientID:row[2],
            patientName: row[3],
            doctorName: row[4],
            date:row[5]
          });
        }
      })
      .on('end', () => {
        // Send the appointments array as the response
        console.log(appointments)
        appointments = appointments;
        if (appointments) {
          resolve(appointments);
        } else {
          reject(new Error(`Patient with name ${name} not found`));
        }
        
      });
    });
    }



    save(destinationFile,appointment_str){
        fs.appendFileSync(destinationFile,appointment_str);
        fs.appendFileSync(destinationFile,'\n');
    }

    // static async findAppointmentsbyDoctorName(name) {
    //     return new Promise((resolve, reject) => {
    //             const records = [];
    //             fs.createReadStream(reqPath)
    //               .pipe(parse({ delimiter: ',', relax_quotes: true }))
    //               .on('data', record => records.push(record))
    //               .on('end', () => {
    //                 const foundRecords = records.filter(r => r.DoctorName === name);
    //                 resolve(foundRecords || null);
    //               })
    //               .on('error', reject);
    //           });
    // }


}
//  bookAppointment(),  viewAppointment(), cancelAppointment(), notes()

module.exports = Appointment;