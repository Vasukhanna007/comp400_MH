const express = require('express');
const router = express.Router();
const fs = require('fs');
const parse = require('csv-parse').parse;
var Appointment = require('../../model/Appointment.js');
path = require('path')
let csvToJson = require('convert-csv-to-json');

var Patient = require('../../model/Patient');
var Doctor = require('../../model/Doctor.js');

// const DATA_DIR= './db_data';
let destinationFile = path.join(__dirname,'..','..', 'db_data','appointment','appointments.csv');
let patientFile = path.join(__dirname,'..','..', 'db_data','patient','patients.csv');
let doctorFile = path.join(__dirname,'..','..', 'db_data','doctor','doctors.csv');

//  console.log(doctor.name); // Outputs 'John Smith'
// console.log(doctor.speciality); // Outputs 'Pediatrics'
// console.log(doctor.certifications); // Outputs ['ABC Hospital', 'XYZ Clinic']
// console.log(destinationFile)
// const patient = new Patient(
//     "suv",
//     "10/01/2000",
//     "M",
//     "vasu@mail.com",
//     "15",
//     "['English']",
//     "fass",
//     "['anxiety']"
//   );

// function findByName(name,file) {
//     // Read the CSV file
//     const data = fs.readFileSync(file, 'utf8');
  
//     // Split the file into an array of rows
//     const rows = data.split('\n');
//     // console.log(rows)
//     // Iterate through each row
//     for (const row of rows) {
//         // Split the row into an array of cells
//         const cells = row.split(',');
    
//         // If the first cell (name column) matches the search term, return the row
//         if (cells[0] === name) {
//           return cells;
//         }
//       }
//   }
  
//   const result = findByName('John');
//   console.log(result);
  

router.post('/',async(req,res) => {
//   const doctor = new Doctor('John Smith', '10/01/2000', 'M', 'john@example.com', '1234567890', ['English'], ['Mind'], 'Pediatrics', 'password123', ['ABC Hospital', 'XYZ Clinic']);
  
    // console.log(doctor.name); // Outputs 'John Smith'
// console.log(doctor.speciality); // Outputs 'Pediatrics'
// console.log(doctor.certifications); // Outputs ['ABC Hospital', 'XYZ Clinic']
    
    const { appointmentId,patientEmail, doctorName, appointmentDate,appointmentTime } = req.body
    console.log(patientEmail, doctorName, appointmentDate,appointmentTime);
    
    const doctor = await Doctor.findByName(doctorName);
    console.log(doctor)

    const patient =  await Patient.findByEmail(patientEmail);
    console.log(patient)

    const date = appointmentDate;

    const appointment = new Appointment( patient,doctor, date);

    console.log(patient)
    console.log(doctor)

    // console.log(patientName);
    // console.log(doctorName);
    // const cells = findByName(doctorName,doctorFile);
    // console.log(typeof(cells));
    // console.log(cells[0]);

    // const doctor = new Doctor(cells[0], cells[1], cells[2], cells[3], cells[4], cells[5], cells[8], cells[9]);// console.log(doctor.getId())

    // const patientrow = findByName(doctorName,patientFile);

    
    // console.log(co)
    // console.log(result);
    // const { patient, doctor, appointmentDate } = req.body;
    // const appointment = new Appointment(patient, doctor, appointmentDate);
     console.log('printing what goes inside apt',appointment.toCsvString())
     appointment_str=appointment.toCsvString()
     appointment.save(destinationFile,appointment_str)

    res.send();

});

router.get('/',(req,res,next) => {
    // console.log(destinationFile)
    try {
        let arr =[];
        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(destinationFile);
        for(let i=0; i<json.length;i++){
            // console.log(json[i]);
            arr.push(json[i])
        }
        const data = fs.readFileSync(destinationFile);
        res.send(arr); 

    } catch (error) {
        res.send('null');
    }
});


router.get('/:doctorName', async(req, res) => {
    // Read the doctor name from the query parameters
    appointments=[];
    const doctorName = req.params.doctorName;
    appointment=await Appointment.getAppointmentsByDoctorName(doctorName);
    res.send(appointment);

    // Read the appointments CSV file
    // fs.createReadStream(destinationFile)
    //   .pipe(parse({ delimiter: ',', relax_quotes: true }))
    //   .on('data', row => {
    //     // Check if the doctor name in the row matches the given doctor name
    //     if (row[2] === doctorName) {
    //       // If it matches, add the appointment to the appointments array
    //       appointments.push({
    //         id: row[0],
    //         patient: row[1],
    //         doctor: row[2],
    //         date:row[3]
    //       });
    //     }
    //   })
    //   .on('end', () => {
    //     // Send the appointments array as the response
    //     res.send(appointments);
    //   });
  });

  router.get('/findByPatientName/:patientEmail', async(req, res) => {
    // Read the doctor name from the query parameters
    appointments=[];
    const patientEmail = req.params.patientEmail;
    appointment=await Appointment.getAppointmentsByPatientEmail(patientEmail);
    res.send(appointment);
  
    // // Read the appointments CSV file
    // fs.createReadStream(destinationFile)
    //   .pipe(parse({ delimiter: ',', relax_quotes: true }))
    //   .on('data', row => {
    //     // Check if the doctor name in the row matches the given doctor name
    //     if (row[1] === patientName) {
    //       // If it matches, add the appointment to the appointments array
    //       appointments.push({
    //         id: row[0],
    //         patient: row[1],
    //         doctor: row[2],
    //         date:row[3]
    //       });
    //     }
    //   })
    //   .on('end', () => {
    //     // Send the appointments array as the response
    //     res.send(appointments);
    //   });
  });

router.post('/:name', (req, res) => {
    // Read the doctor name from the request body
    const doctorName = req.body.doctorName;
  
    // Read the appointments CSV file
    fs.createReadStream(appointmentsPath)
      .pipe(parse({ delimiter: ',', relax_quotes: true }))
      .on('data', row => {
        // Check if the doctor name in the row matches the given doctor name
        if (row[1] === doctorName) {
          // If it matches, add the appointment to the appointments array
          appointments.push({
            date: row[0],
            doctor: row[1],
            patient: row[2]
          });
        }
      })
      .on('end', () => {
        // Send the appointments array as the response
        res.send(appointments);
      });
  });



function findByIdAndDelete(id, csvFilePath) {
    console.log(id)
    // Read the CSV file into memory
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
  
    // Split the CSV data into an array of lines
    const lines = csvData.split('\n');
    console.log(lines);

    // Remove the line with the matching ID
    const modifiedLines = lines.filter(line => {

        // Split the line into fields
        const fields = line.split(',');
    
        // Return false if the first field matches the ID, true otherwise
        return fields[0] !== id;
      });
   console.log(modifiedLines.join('\n'));
    // Write the modified data back to the CSV file
    fs.writeFileSync(csvFilePath, modifiedLines.join('\n'), 'utf8');
  };

router.delete('/:id', (req, res) => {
    // Get the ID of the appointment to cancel
    const appointmentId = req.params.id;
  
    // Find the appointment in the database and delete it
    findByIdAndDelete(appointmentId,destinationFile)
    res.send();
});

module.exports = router;
