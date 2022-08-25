/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const {chai, should, server} = require('./config.js');
const {assert} = require('chai');

describe('Utility Test', () => {
    // Invalid methods test
    describe('Invalid method test', () => {
        it('should return error for invalid methods', (done) => {
            chai.request(server).copy('/v1/users/signup').end((err, res) => {
                res.should.have.status(405);
                res.body.should.have.property('error').have.property('message').eql('Method not allowed');
                done();
            });
        });
    });

    // Invalid route test
    describe('Invalid route test', () => {
        it('should return no resource was found error', (done) => {
            chai.request(server).get('/users/').end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error').have.property('message').eql('Invalid request! No resource was found!');
                done();
            });
        });
    });

    // OPTIONS method test
    describe('/OPTIONS method test', () => {
        it('should return all allowed methods', (done) => {
            chai.request(server).options('/v1/products').end((err, res) => {
                res.should.have.status(200);
                // console.log(res);
                assert(res.header['access-control-allow-methods'] === 'POST, PATCH, DELETE, GET, OPTIONS');
                done();
            });
        });
    });
});


