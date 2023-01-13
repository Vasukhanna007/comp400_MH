const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
// const server = require('../server');
const fs = require('fs');
const path = require('path');
const destinationFile = path.join(__dirname,'..','db_data','appointment','appointments.csv');

chai.use(chaiHttp);

describe('Appointment', () => {
    //Test the POST route
    describe('POST /appointment', () => {
        it('should create a new appointment and save it to the CSV file', (done) => {
            const payload = {
                appointmentId: '1',
                patientEmail: 'test@example.com',
                doctorName: 'John Smith',
                appointmentDate: '01/01/2022',
                appointmentTime: '10:00'
            }
            chai.request('http://localhost:3001/appointment')
                .post('/')
                .send(payload)
                .end((err, res) => {
                    res.should.have.status(200);
                    //assert that the appointment has been saved to the CSV file
                    const data = fs.readFileSync(destinationFile, 'utf8');
                    data.should.include(payload.appointmentId);
                    data.should.include(payload.patientEmail);
                    data.should.include(payload.doctorName);
                    data.should.include(payload.appointmentDate);
                    data.should.include(payload.appointmentTime);
                    done();
                });
        });
    });

    //Test the GET route
    describe('GET /appointment', () => {
        it('should return an array of JSON objects representing the appointments', (done) => {
            chai.request('http://localhost:3001/appointment')
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('appointmentId');
                    res.body[0].should.have.property('patient');
                    res.body[0].should.have.property('doctor');
                    res.body[0].should.have.property('date');
                    res.body[0].should.have.property('time');
                    done();
                    });
                    });
                    });



                });