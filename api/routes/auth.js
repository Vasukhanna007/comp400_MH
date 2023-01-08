const express = require('express');
const router = express.Router();
const fs = require('fs');
const { parse } = require('csv-parse');
var Patient = require('../../Patient.js');
path = require('path')

const DATA_DIR= './db_data';
let patientPath = path.join(__dirname,'..','..', 'db_data','patient','patients.csv');
let docPath = path.join(__dirname,'..','..', 'db_data','doctor','doctors.csv');

console.log('here',patientPath)

// function isValidCredentials(){
// if (req.body.isDoctor){
//     const destinationFile = docPath;
//     var csvData=[];
//     fs.createReadStream(destinationFile).pipe(parse({delimiter: ',',relax_quotes: true})).on('data', function(csvrow) {
//     if (csvrow.includes(req.body.email) && (csvrow.includes(req.body.password) )){
//         auth=true
//         console.log("Authenticated")
//     }

//     //do something with csvrow
//     csvData.push(csvrow);        
// })
// .on('end',function() {
//   //do something with csvData
// //   console.log(csvData);

//   if(auth===false){
//     console.log('failed')
// }
// res.send(auth);
// });

//     const data = fs.readFileSync(destinationFile);
//     // console.log(typeof(data));

// }
// else{
//     const destinationFile = patientPath;
//     var csvData=[];
//     fs.createReadStream(destinationFile).pipe(parse({delimiter: ',',relax_quotes: true})).on('data', function(csvrow) {
//     if (csvrow.includes(req.body.email) && (csvrow.includes(req.body.password) )){
//         auth=true
//         console.log(csvrow)

//         console.log("Authenticated")
//     }

//     //do something with csvrow
//     csvData.push(csvrow);        
// })
// .on('end',function() {
//   //do something with csvData
// //   console.log(csvData);
   

//   if(auth===false){
//     console.log('failed')
// }
// res.send(auth);
// });

//     const data = fs.readFileSync(destinationFile);
//     // console.log(typeof(data));
 

// }


router.post('/',(req,res,next) => {
   var auth = false;
   console.log(req.body.isDoctor)
   if (req.body.isDoctor){
    const destinationFile = docPath;
    var csvData=[];
    fs.createReadStream(destinationFile).pipe(parse({delimiter: ',',relax_quotes: true})).on('data', function(csvrow) {
    if (csvrow.includes(req.body.email) && (csvrow.includes(req.body.password) )){
        auth=true
        console.log("Authenticated")
    }

    //do something with csvrow
    csvData.push(csvrow);        
})
.on('end',function() {
  //do something with csvData
//   console.log(csvData);

  if(auth===false){
    console.log('failed')
}
res.send(auth);
});

    // const data = fs.readFileSync(destinationFile);
    // console.log(typeof(data));

}
else{
    const destinationFile = patientPath;
    var csvData=[];
    fs.createReadStream(destinationFile).pipe(parse({delimiter: ',',relax_quotes: true})).on('data', function(csvrow) {
    if (csvrow.includes(req.body.email) && (csvrow.includes(req.body.password) )){
        auth=true
        console.log(csvrow)

        console.log("Authenticated")
    }

    //do something with csvrow
    csvData.push(csvrow);        
})
.on('end',function() {
  //do something with csvData
//   console.log(csvData);
   

  if(auth===false){
    console.log('failed')
}
res.send(auth);
});
}
    // const data = fs.readFileSync(destinationFile);

    
    

});

module.exports = router;


