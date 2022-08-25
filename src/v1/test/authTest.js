/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const {chai, should, server} = require('./config.js');
const userModel = require('../database/models/userModel');

describe('User', () => {
    before((done) => {
        userModel.deleteMany({}, (err) => {
            done();
        });
    });

    const validUserData = {
        'email': 'testemail@email.com',
        'password': 'testPassword',
    };

    const nonExistingUserData = {
        'email': 'nonexistuser@email.com',
        'password': 'testPassword',
    };

    const invalidUsersData = [
        {
            'email': '',
            'password': '',
        },
        {
            'email': 'testEmail@email.com',
        },
        {
            'password': 'testPassword',
        },
        {
            'email': 'testEmail@email.com',
            'password': 'testPassword',
            'extra': 'extra',
        },
        {
            'email': 'testEmailEmail.com',
            'password': 'testPassword',
        },
    ];


    // Test the /POST signup route
    // Invalid cases
    invalidUsersData.forEach(function(invalidUserData) {
        describe('/POST signup', () => {
            it('should return error for invalid user data', (done) => {
                chai.request(server).post('/v1/users/signup').send(invalidUserData).end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error').have.property('message').eql('Invalid email or password');
                    done();
                });
            });
        });
    });

    // Valid case
    describe('/POST signup', () => {
        it('should create a user', (done) => {
            chai.request(server).post('/v1/users/signup').send(validUserData).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                done();
            });
        });
    });

    // Duplicate case
    describe('/POST signup', () => {
        it('should return error for duplicated user', (done) => {
            chai.request(server).post('/v1/users/signup').send(validUserData).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error').have.property('message').eql('User already exists');
                done();
            });
        });
    });

    // Test /POST login route
    // Invalid cases
    invalidUsersData.forEach(function(invalidUserData) {
        describe('/POST login', () => {
            it('should return error for wrong email or password', (done) => {
                chai.request(server).post('/v1/users/login').send(invalidUserData).end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error').have.property('message').eql('Wrong email or password');
                    done();
                });
            });
        });
    });

    // Valid case
    describe('/POST login', () => {
        it('should return success message and a token', (done) => {
            chai.request(server).post('/v1/users/login').send(validUserData).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('token');
                done();
            });
        });
    });

    // Non-existing case
    describe('/POST login', () => {
        it('should return wrong email or password', (done) => {
            chai.request(server).post('/v1/users/login').send(nonExistingUserData).end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error').have.property('message').eql('Wrong email or password');
                done();
            });
        });
    });
});
