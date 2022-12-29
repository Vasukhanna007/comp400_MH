const express = require('express');
const bodyParser   =  require('body-parser');

const fs = require('fs');
var Patient = require('./Patient.js');
var Doctor = require('./Doctor.js');


const DATA_DIR= 'db_data';

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json());



app.post('/patient/:patientId',(req,res) => {
    
    var patient1= new Patient(req.body.name,req.body.age, req.body.medicalhistory);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log(patient1)
    const destinationFile = `${DATA_DIR}/patient/${req.params.patientId}`;
    console.log(destinationFile)

    fs.writeFileSync(destinationFile,JSON.stringify(patient1, null, 2) , 'utf-8');
    res.send();

});


app.post('/doctor/:doctorId',(req,res) => {
    
    var doctor1= new Doctor(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.certifications,req.body.speciality);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log(doctor1)
    const destinationFile = `${DATA_DIR}/doctor/${req.params.doctorId}`;
    console.log(destinationFile)

    fs.writeFileSync(destinationFile,JSON.stringify(doctor1, null, 2) , 'utf-8');
    res.send();

});


// const destinationFile =  `${DATA_DIR}/${req.params.patientId}`;

app.listen(3001, () => {
    console.log('Listening on port 3001!');
});