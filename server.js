const express = require('express');
const bodyParser   =  require('body-parser');

const fs = require('fs');
var Patient = require('./Patient.js');
var Doctor = require('./Doctor.js');
var Appointment  = require('./Appointment.js');

const DATA_DIR= 'db_data';

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());



app.post('/patient/',(req,res) => {
    
    var patient1= new Patient(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.medicalhistory);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log(patient1)
    const destinationFile = `${DATA_DIR}/patient/patients.csv`;
    const data = fs.readFileSync(destinationFile);
    console.log(typeof(data))
    console.log(destinationFile)

    fs.appendFileSync(destinationFile,JSON.stringify(patient1, null, 2) , 'utf-8');
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
    
    var doctor1= new Doctor(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.certifications,req.body.speciality);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log(doctor1)
    const destinationFile = `${DATA_DIR}/doctor/doctors.csv`;
    console.log(destinationFile)

    fs.appendFileSync(destinationFile,JSON.stringify(doctor1, null, 2) , 'utf-8');
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
    var doctor1= new Doctor( "ja",
    "10/01/2000",
     "M",
    "vasu@mail.com",
    "541003941",
    "['English']",
     "['mind']",
     14,
     "['mind']");
    var patient1= new Patient( "arth",
   "10/01/2000",
    "M",
    "vasu@mail.com",
    "541003941",
    "['English']",
     "['anxiety']");

    var appointment1= new Appointment(patient1,doctor1, req.body.date,req.body.time);
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