const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parse } = require('csv-parse');
var Appointment = require('../../Appointment.js');
path = require('path')
let csvToJson = require('convert-csv-to-json');

// var patient = require('./Patient.js');
// var doctor = require('./Doctor.js');


// const DATA_DIR= './db_data';
let destinationFile = path.join(__dirname,'..','..', 'db_data','appointment','appointments.csv');
console.log(destinationFile)

router.post('/',(req,res,next) => {

    const { patient, doctor, appointmentDate } = req.body;
    const appointment = new Appointment(patient, doctor, appointmentDate);
    console.log(appointment.toCsvString())
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
