const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /playstore-apps', () => {
    it('should generate an array of objects representing apps', () => {
        return supertest(app)
            .get('/playstore-apps') // invoke the endpoint
            .query({ search: "" }) // send the query 
            .query({ genres: "" }) // send the query 
            .query({ sort: "" }) // send the query 
            .expect(200)  // assert that you get a 200  OK status
            .expect('Content-Type', /json/)
            .then(res => {
                // make sure you get an array
                expect(res.body).to.be.an('array');
                // array must not be empty
                expect(res.body).to.have.lengthOf.at.least(1);
                expect([{ App: "" }]).to.deep.include({ App: "" });
            });
    })
});
