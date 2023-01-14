var patient = require('./Patient.js');
var doctor = require('./Doctor.js');
const fs = require('fs');
let reqPath = path.join(__dirname,'..' ,'db_data','appointment','appointments.csv');
const parse = require('csv-parse').parse;


class Appointment{
    constructor(patient,doctor,appointmentDate,time){
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDate = appointmentDate;
        this.appointmentId = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        this.time= time;
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

      static formatDate(dates){
        const date = new Date(dates);
        const formattedDate = date.toISOString().slice(0, 10);
        return formattedDate;
      }
      
    toCsvString() {
        
    return `${this.appointmentId},${this.getDoctorID()},${this.getPatientID()},${this.patient.email},${this.doctor.name},${Appointment.formatDate(this.appointmentDate)},${this.time},${this.doctor.email}`;
    
  }

  static async checkAvailability(doctorId, date, time) {
    return new Promise((resolve, reject) => {
    // Create a variable to store the availability status
    let isAvailable = true;

    // Read the CSV file using fs.createReadStream
    fs.createReadStream(reqPath)
      .pipe(parse({ delimiter: ',', relax_quotes: true }))
      .on('data', row => {
        // Check if the doctor id, date, and time in the row match the given parameters
        if (row[1] === doctorId && row[5] === date && row[6] === time) {
          // If they match, change the availability status to false
          isAvailable = false;
        }
      })
      .on('end', () => {
        // Return the availability status
        console.log('Available insidee',isAvailable)

        resolve(isAvailable);
        
        reject(new Error(`this ${date} and ${time} is not available`));
      });
      });
}


    static async getAppointmentsByDoctorEmail(doctorEmail){
      return new Promise((resolve, reject) => {
      appointments=[]

      fs.createReadStream(reqPath)
      .pipe(parse({ delimiter: ',', relax_quotes: true }))
      .on('data', row => {
        // Check if the doctor name in the row matches the given doctor name
        if (row[7] === doctorEmail) {
          // If it matches, add the appointment to the appointments array
          appointments.push({
            appointmentId: row[0],
            doctorID:row[1],
            PatientID:row[2],
            patientName: row[3],
            DoctorName: row[4],
            appointmentDate:row[5],
            appointmentTime:row[6],
            doctorEmail:row[7]

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
            PatientID:row[2],
            patientName: row[3],
            DoctorName: row[4],
            appointmentDate:row[5],
            appointmentTime:row[6],
            doctorEmail:row[7]
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