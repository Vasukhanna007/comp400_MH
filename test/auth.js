const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const router = require("../api/routes/auth");
const expect = chai.expect;
const path = require('path');
 const fs = require('fs');


chai.use(chaiHttp);

describe('Router POST /', () => {
    beforeEach((done) => {
        // Clear the data in the csv file before each test
        fs.truncateSync(path.join(__dirname,'..', 'db_data','patient','patients.csv'), 0, (err) => {
            if (err) throw err;
        });
        done();
    });
    it('should return true if valid credentials are provided', (done) => {
        chai.request('http://localhost:3001/auth')
            .post('/')
            .send({email: "test@test.com", password: "password",isDoctor:false})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.true;
                done();
            });
    });
    it('should return false if invalid credentials are provided', (done) => {
        chai.request('http://localhost:3001/auth')
            .post('/')
            .send({email: "test@test.com", password: "wrongpassword",isDoctor:false})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.false;
                done();
            });
    });
});