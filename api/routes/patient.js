const express = require('express');
const router = express.Router();
const fs = require('fs');
// const { parse } = require('csv-parse');
const { parse } = require('json2csv');

var Patient = require('../../model/Patient.js');
path = require('path')
let csvToJson = require('convert-csv-to-json');

const DATA_DIR= './db_data';
let reqPath = path.join(__dirname,'..','..', 'db_data','patient','patients.csv');
console.log("routesp",reqPath)

router.post('/',(req,res,next) => {
  console.log(typeof(req.body.name))

    var patient1= new Patient(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.password, req.body.medicalHistory);
    const destinationFile = reqPath;

    // let count  =  -1;
    //  console.log(Object.keys(req.body).length)
    //  arr = console.log(Object.values(patient1))
    //  for (const [key, value] of Object.entries(patient1)) {
    //     count+=1
    //     fs.appendFileSync(destinationFile,JSON.stringify(value).replace(/^"|"$/g, ''));
    //     if(count===Object.keys(req.body).length){
    //         fs.appendFileSync(destinationFile,"\n");
    //         break;
    //     }
    //     fs.appendFileSync(destinationFile,',')

    //   }
    console.log('printing what goes inside pat',patient1.toCsvString())
     patient_str=patient1.toCsvString()
     patient1.save(destinationFile,patient_str)

    res.send();
});

router.get('/', (req,res,next) => {
    const destinationFile = reqPath;
    console.log(destinationFile)
    // try {
        let arr =[];
        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(destinationFile);
        for(let i=0; i<json.length;i++){
            // console.log(json[i]);
            arr.push(json[i])
        }
        const data = fs.readFileSync(destinationFile);
        res.send(arr); 

});

router.delete('/:patientId', (req,res,next) => {
    const idToSearchFor =  req.params.patientId;
    const destinationFile = reqPath;

    console.log(destinationFile)
    // try {
        let arr =[];
        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(destinationFile);
        for(let i=0; i<json.length;i++){
            console.log(json[i]);
            arr.push(json[i])
        }
        let returnarr=[];
        function findAndRemove(array, property, value) {
            array.forEach(function(result, index) {
              if(result[property] === value) {
                //Remove from array
                array.splice(index, 1);
                console.log("deleted",array)

                var json= array
                var fields = Object.keys(json[0])
                var replacer = function(key, value) { return value === null ? '' : value } 
                var csv = json.map(function(row){
                return fields.map(function(fieldName){
                    return JSON.stringify(row[fieldName], replacer).replace(/^"|"$/g, '')
                }).join(',')
                })
                csv.unshift(fields.join(',')) // add header column
                csv = csv.join('\r\n');
                console.log(csv)
                fs.writeFileSync(destinationFile,csv);
                fs.appendFileSync(destinationFile,"\n");

                returnarr=array

              }    
            });
          }
       findAndRemove(arr,"patientId",idToSearchFor)

       res.send(returnarr);


});

router.put('/:patientId', (req,res,next) => {
    const idToSearchFor =  req.params.patientId;
    const destinationFile = reqPath;


    console.log("here")
    let arr =[];
    let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(destinationFile);
    for(let i=0; i<json.length;i++){
        console.log(json[i]);
        arr.push(json[i])
    }

    function findAndRemove(array, property, value) {
        array.forEach(function(result, index) {
          if(result[property] === value) {
            //Remove from array
            array.splice(index, 1);
            console.log("deleted",array)

            var json= array
            var fields = Object.keys(json[0])
            var replacer = function(key, value) { return value === null ? '' : value } 
            var csv = json.map(function(row){
            return fields.map(function(fieldName){
                return JSON.stringify(row[fieldName], replacer).replace(/^"|"$/g, '')
            }).join(',')
            })
            csv.unshift(fields.join(',')) // add header column
            csv = csv.join('\r\n');
            console.log(csv)
            fs.writeFileSync(destinationFile,csv);
            fs.appendFileSync(destinationFile,"\n");

            returnarr=array

          }    
        });
      }
      findAndRemove(arr,"patientId",idToSearchFor)


    var patient1= new Patient(req.body.name,req.body.dob, req.body.gender,req.body.email,req.body.phone,req.body.language,req.body.password, req.body.medicalHistory);
    let count  =  -1;
     console.log(Object.keys(req.body).length)
     arr = console.log(Object.values(patient1))
     fs.appendFileSync(destinationFile,"\n");
     for (const [key, value] of Object.entries(patient1)) {
        count+=1
        fs.appendFileSync(destinationFile,JSON.stringify(value).replace(/^"|"$/g, ''));
        if(count===Object.keys(req.body).length){
            fs.appendFileSync(destinationFile,"\n");
            break;
        }
        fs.appendFileSync(destinationFile,',')
      }
      res.send();


});



module.exports = router;