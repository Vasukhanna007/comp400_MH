const express = require('express');
const bodyParser   =  require('body-parser');

const fs = require('fs');
var Patient = require('./Patient.js');
var Doctor = require('./Doctor.js');
var Appointment  = require('./Appointment.js');
const  Parser  = require('json2csv');

const DATA_DIR= 'db_data';

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());



app.post('/patient/',(req,res) => {
    
    var patient1= new Patient(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.password, req.body.medicalhistory);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");
     //jsons = JSON.stringify(patient1, null, 2)
    const destinationFile = `${DATA_DIR}/patient/patients.csv`;
    let count  =  -1
     console.log(Object.keys(req.body).length)
     arr = console.log(Object.values(patient1))
     for (const [key, value] of Object.entries(patient1)) {
        count+=1
        fs.appendFileSync(destinationFile,JSON.stringify(value));
        if(count===Object.keys(req.body).length){
            fs.appendFileSync(destinationFile,"\n");
            break;
        }
        fs.appendFileSync(destinationFile,',')
      }
     


    res.send();
});

app.get('/patient/',(req,res) => {
    const destinationFile = `${DATA_DIR}/patient/patients.csv`;
    // console.log(destinationFile)
    try {
        const data = fs.readFileSync(destinationFile);
        res.send(data);

    } catch (error) {
        res.send('null');
    }
});

app.post('/doctor/',(req,res) => {
    
    var doctor1= new Doctor(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.certifications,req.body.speciality, req.body.password);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log(doctor1)
    const destinationFile = `${DATA_DIR}/doctor/doctors.csv`;
    console.log(destinationFile)
    let count  =  -1
    console.log(Object.keys(req.body).length)
    arr = console.log(Object.values(doctor1))
    for (const [key, value] of Object.entries(doctor1)) {
       count+=1
       fs.appendFileSync(destinationFile,JSON.stringify(value));
       if(count===Object.keys(req.body).length){
           fs.appendFileSync(destinationFile,"\n");
           break;
       }
       fs.appendFileSync(destinationFile,',')
     }

    // fs.appendFileSync(destinationFile,JSON.stringify(doctor1, null, 2) , 'utf-8');
    res.send();

});

app.get('/doctor/',(req,res) => {
    const destinationFile = `${DATA_DIR}/doctor/doctors.csv`;
    // console.log(destinationFile)
    try {
        const data = fs.readFileSync(destinationFile);
        res.send(data);

    } catch (error) {
        res.send('null');
    }
});

app.post('/appointment/',(req,res) => {

    var patient1= new Patient(req.body.patient.name,req.body.patient.dob, req.body.patient.gender,req.body.patient.email,req.body.patient.phone,req.body.patient.language,req.body.patient.password, req.body.patient.medicalhistory);
    var doctor1= new Doctor(req.body.doctor.name,req.body.doctor.dob, req.body.doctor.gender,req.body.doctor.email,req.body.doctor.phone,req.body.doctor.language,req.body.doctor.certifications,req.body.doctor.speciality, req.body.doctor.password);
 
    console.log(req.body.patient.name)

    var appointment1= new Appointment(patient1, doctor1, req.body.date,req.body.time);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log(appointment1)
    const destinationFile = `${DATA_DIR}/appointment/appointments.csv`;
    console.log(destinationFile)

    fs.appendFileSync(destinationFile,JSON.stringify(appointment1, null, 2) , 'utf-8');
    res.send();

});

app.get('/appointment/',(req,res) => {
    const destinationFile = `${DATA_DIR}/appointment/appointments.csv`;
    // console.log(destinationFile)
    try {
        const data = fs.readFileSync(destinationFile);
        res.send(data);

    } catch (error) {
        res.send('null');
    }
});

// const destinationFile =  `${DATA_DIR}/${req.params.patientId}`;

app.listen(3001, () => {
    console.log('Listening on port 3001!');
});