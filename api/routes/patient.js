const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parse } = require('csv-parse');
var Patient = require('../../Patient.js');
path = require('path')

const DATA_DIR= './db_data';
let reqPath = path.join(__dirname,'..','..', 'db_data','patient','patients.csv');
console.log(reqPath)

router.post('/',(req,res,next) => {
    
    var patient1= new Patient(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.password, req.body.medicalhistory);
    const destinationFile = reqPath;
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

router.get('/', (req,res,next) => {
    const destinationFile = reqPath;
    console.log(destinationFile)
    try {
        
        const data = fs.readFileSync(destinationFile);
        res.send(data);

    } catch (error) {
        res.send('null');
    }
});

module.exports = router;