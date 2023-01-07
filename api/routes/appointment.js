const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parse } = require('csv-parse');
var Appointment = require('../../Appointment.js');
path = require('path')
let csvToJson = require('convert-csv-to-json');


// const DATA_DIR= './db_data';
let reqPath = path.join(__dirname,'..','..', 'db_data','appointment','appointments.csv');
console.log(reqPath)

router.post('/',(req,res,next) => {

    var patient1= new Patient(req.body.patient.name,req.body.patient.dob, req.body.patient.gender,req.body.patient.email,req.body.patient.phone,req.body.patient.language,req.body.patient.password, req.body.patient.medicalhistory);
    var doctor1= new Doctor(req.body.doctor.name,req.body.doctor.dob, req.body.doctor.gender,req.body.doctor.email,req.body.doctor.phone,req.body.doctor.language,req.body.doctor.certifications,req.body.doctor.speciality, req.body.doctor.password);
 
    console.log(req.body.patient.name)

    var appointment1= new Appointment(patient1, doctor1, req.body.date,req.body.time);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log(appointment1)
    const destinationFile = reqPath;
    console.log(destinationFile)

    fs.appendFileSync(destinationFile,JSON.stringify(appointment1, null, 2) , 'utf-8');
    res.send();

});

router.get('/',(req,res,next) => {
    const destinationFile = reqPath;
    // console.log(destinationFile)
    try {
        const data = fs.readFileSync(destinationFile);
        res.send(data);

    } catch (error) {
        res.send('null');
    }
});
module.exports = router;
