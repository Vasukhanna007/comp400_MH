const chai = require('chai');
const chaiHttp = require('chai-http');
const router = require("../api/routes/doctor");
const expect = chai.expect;
chai.use(chaiHttp);

describe('Router POST /', () => {
    it('should create a new doctor and save it to the CSV file', (done) => {
        chai.request('http://localhost:3001/doctor')
            .post('/')
            .send({name: 'John Smith', dob: '10/01/2000', gender: 'M', email: 'john@example.com', phone: '1234567890', language: ['English'], certifications: ['Mind'], speciality: 'Pediatrics', password: 'password123'})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                // assert that the CSV file has been updated with the new doctor
                done();
            });
    });
});

describe('Router GET /', () => {
    it('should return an array of JSON objects', (done) => {
        chai.request('http://localhost:3001/doctor')
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                for (let i = 0; i < res.body.length; i++) {
                    expect(res.body[i]).to.be.an('object');
                }
                done();
            });
    });
});


