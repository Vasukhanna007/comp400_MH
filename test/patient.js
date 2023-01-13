// let chai = require("chai");
// let chaiHttp = require("chai-http");

// let patient = require("../api/routes/patient")

// chai.should();

// chai.use(chaiHttp);


// describe('Patient Api', () => {

//     //test the get 
//     describe("GET /dashboard/", () => {
//         it("It should get all the patients", (done)=> {
//             chai.request(patient)
//                 .get("/")
//                 .end((err, response) =>{
//                     response.should.have.status(200);
//                     responnse.body.should.be.a("array");
//                 done();
//                 })
//         })
//     })

//     //test post

//     //test Delete


//     //test put 




// } );

const chai = require('chai');
const chaiHttp = require('chai-http');
const router = require("../api/routes/patient");
// const csvToJson = require('csvtojson');
// const fs = require('fs');
const expect = chai.expect;
let reqPath = path.join(__dirname,'..', 'db_data','patient','patients.csv');
console.log(reqPath);
chai.use(chaiHttp);
describe('Router POST /', () => {
    it('should create a new patient and save it to the CSV file', (done) => {
        const patientData = {
            name: "John Doe",
            dob: "01/01/2000",
            gender: "male",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            language: "English",
            password: "password",
            medicalHistory: "None"
        };
        chai.request( 'http://localhost:3001/patient')
            .post('/')
            .send(patientData)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                // check that the CSV file has been updated with the new patient
                // by reading the file and checking if the new patient is in the file
                const jsonData = csvToJson.fieldDelimiter(',').getJsonFromCsv(reqPath);
                const newPatient = jsonData.find(patient => patient.name === patientData.name);
                expect(newPatient).to.deep.equal(patientData);
                done();
            });
    });
});

describe('Router GET /', () => {
    it('should return an array of JSON objects', (done) => {
        chai.request('http://localhost:3001/patient')
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                for (let i = 0; i < res.body.length; i++) {
                    console.log("i am here",res.body[i])
                    expect(res.body[i]).to.be.an('object');
                }
                done();
            });
    });
});

describe('Router DELETE /:patientId', () => {
    it('should delete a patient with the given patientId', (done) => {
        const patientId = "541003941";
        chai.request('http://localhost:3001/patient')
            .delete(`/${patientId}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                // check that the patient with the given patientId has been deleted
                // by reading the file and checking if the patient is no longer in the file
                const jsonData = csvToJson.fieldDelimiter(',').getJsonFromCsv(reqPath);
                const deletedPatient = jsonData.find(patient => patient.id === patientId);
                expect(deletedPatient).to.be.undefined;
                done();
            });
    });
});

