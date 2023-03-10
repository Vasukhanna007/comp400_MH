const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parse } = require('csv-parse');
var Doctor = require('../../model/Doctor.js');
path = require('path')
let csvToJson = require('convert-csv-to-json');


// const DATA_DIR= './db_data';
let reqPath = path.join(__dirname,'..','..', 'db_data','doctor','doctors.csv');
// console.log(reqPath)

// const doctor = new Doctor('John Smith', '10/01/2000', 'M', 'john@example.com', '1234567890', ['English'], ['Mind'], 'Pediatrics', 'password123', ['ABC Hospital', 'XYZ Clinic']);


router.post('/',(req,res,next) => {
    // const doctor2 = new Doctor('John Smith', '10/01/2000', 'M', 'john@example.com', '1234567890', ['English'], ['Mind'], 'Pediatrics', 'password123', ['ABC Hospital', 'XYZ Clinic']);
    console.log('type of ',typeof(req.body.name))
    const doctor1= new Doctor(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.certifications,req.body.speciality, req.body.password);
    // var patient1= new Patient("vasu","20", "[anxiety, ADHD]");

    console.log("this nw",doctor1)
    const destinationFile = reqPath;
    // console.log(destinationFile)
    let count  =  -1 // no of autofill values
    console.log(Object.keys(req.body).length)
    // arr = console.log(Object.values(doctor1))
    
    for (const [key, value] of Object.entries(doctor1)) {
       count+=1
       fs.appendFileSync(destinationFile,JSON.stringify(value).replace(/^"|"$/g, ''));
       if(count===Object.keys(req.body).length){
           fs.appendFileSync(destinationFile,"\n");
           break;
       }
       fs.appendFileSync(destinationFile,',')
     }

    // fs.appendFileSync(destinationFile,JSON.stringify(doctor1, null, 2) , 'utf-8');
    res.send();
});


router.get('/',(req,res,next) => {
    const destinationFile = reqPath;
    // console.log(destinationFile)
    // try
    
        let arr =[];
        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(destinationFile);
        for(let i=0; i<json.length;i++){
            console.log(json[i]);
            arr.push(json[i])

        }
        const data = fs.readFileSync(destinationFile);
        res.send(arr); 


    // } catch (error) {
    //     res.send('null');
    // }
});

module.exports = router;
