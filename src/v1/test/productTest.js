/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const {chai, should, server} = require('./config.js');
const productModel = require('../database/models/productModel');
const userModel = require('../database/models/userModel');
const {assert} = require('chai');

describe('Product', () => {
    before((done) => {
        productModel.deleteMany({}, (err) => {
            done();
        });
    });

    const testUserData = {
        'email': 'testemailforproduct@email.com',
        'password': 'testPassword',
    };

    const invalidProductsData = [
        {
            'description': 'test description',
            'price': 11,
            'quantity': 11,
        },
        {
            'name': 'test product',
            'price': 11,
            'quantity': 11,
        },
        {
            'name': 'test product',
            'description': 'test description',
            'quantity': 11,
        },
        {
            'name': 'test product',
            'description': 'test description',
            'price': 11,
        },
        {
            'name': 123141,
            'description': 'test description',
            'price': 11,
            'quantity': 11,
        },
        {
            'name': 'test product',
            'description': 'test description',
            'price': '11',
            'quantity': 11,
        },
        {
            'name': 'test product',
            'description': 'test description',
            'price': 11,
            'quantity': '11',
        },
        {
            'name': 'test product',
            'description': 11,
            'price': 11,
            'quantity': 11,
        },
        {

        },
        {
            'name': 'test product',
            'description': 'test description',
            'price': 11,
            'quantity': 11,
            'extra': 'extra',
        },
    ];

    const validProductData = {
        'name': 'test product',
        'description': 'test description',
        'price': 11,
        'quantity': 11,
    };

    const patchProductData = {
        'name': 'patched test product',
        'description': 'patched test description',
        'price': 10,
        'quantity': 10,
    };

    let testProductId = null;

    // Test /POST signup route
    describe('/POST signup for product routes test', () => {
        before((done) => {
            userModel.deleteMany({}, (err) => {
                done();
            });
        });
        it('should create a user', (done) => {
            chai.request(server).post('/v1/users/signup').send(testUserData).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                done();
            });
        });
    });

    // Test /POST login route for product routes test
    describe('/POST login for product routes test', () => {
        it('should return success message and a token', (done) => {
            chai.request(server).post('/v1/users/login').send(testUserData).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('token');
                testUserData.token = res.body.token;
                done();
            });
        });
    });

    // Test /POST product routes
    // Invalid cases
    invalidProductsData.forEach(function(invalidProductData) {
        describe('/POST product routes', () => {
            it('should return error for invalid product data', (done) => {
                chai.request(server).post('/v1/products').set('Authorization', 'Bearer ' + testUserData.token).send(invalidProductData).end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('error').have.property('message').eql('Invalid product data');
                    done();
                });
            });
        });
    });

    // Valid case
    describe('/POST product routes', () => {
        it('should create a new product', (done) => {
            chai.request(server).post('/v1/products').set('Authorization', 'Bearer ' + testUserData.token).send(validProductData).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Product created successfully');
                done();
            });
        });
    });

    // Test /GET all product route
    describe('/GET all product route', () => {
        it('should return all products', (done) => {
            chai.request(server).get('/v1/products').send(validProductData).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('products');
                assert(res.body.products[0].name === validProductData.name);
                assert(res.body.products[0].description === validProductData.description);
                assert(res.body.products[0].price === validProductData.price);
                assert(res.body.products[0].quantity === validProductData.quantity);
                testProductId = res.body.products[0]._id;
                done();
            });
        });
    });

    // Test /GET product by id route
    describe('/GET product by id route', () => {
        it('should return 1 product with specific id', (done) => {
            chai.request(server).get('/v1/products/' + testProductId).send(validProductData).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('product');
                assert(res.body.product.name === validProductData.name);
                assert(res.body.product.description === validProductData.description);
                assert(res.body.product.price === validProductData.price);
                assert(res.body.product.quantity === validProductData.quantity);
                done();
            });
        });
    });

    // Invalid length id test
    describe('/GET product by id route', () => {
        it('should return error in getting product', (done) => {
            chai.request(server).get('/v1/products/' + 'aaaaaaa').send(validProductData).end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('error').have.property('message').eql('Cannot get product');
                done();
            });
        });
    });

    // ID not exist test
    describe('/GET product by id route', () => {
        it('should return error in getting product', (done) => {
            chai.request(server).get('/v1/products/' + 'aaaaaaaaaaaaaaaaaaaaaaaa').send(validProductData).end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error').have.property('message').eql('Product not found');
                done();
            });
        });
    });

    // Test /PATCH product by id route
    describe('/PATCH product by id route', () => {
        it('should successfully change product data', (done) => {
            chai.request(server).patch('/v1/products/' + testProductId).set('Authorization', 'Bearer ' + testUserData.token).send(patchProductData).end((err, res) => {
                res.should.have.status(200);
                assert(res.body.product.name === patchProductData.name);
                assert(res.body.product.description === patchProductData.description);
                assert(res.body.product.price === patchProductData.price);
                assert(res.body.product.quantity === patchProductData.quantity);
                done();
            });
        });
    });

    // ID not exist test
    describe('/PATCH product by id route', () => {
        it('should return error in getting product', (done) => {
            chai.request(server).patch('/v1/products/' + 'aaaaaaaaaaaaaaaaaaaaaaaa').set('Authorization', 'Bearer ' + testUserData.token).send(validProductData).end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error').have.property('message').eql('Product not found');
                done();
            });
        });
    });

    // Invalid length id test
    describe('/PATCH product by id route', () => {
        it('should return error in getting product', (done) => {
            chai.request(server).patch('/v1/products/' + 'aaaaaaa').set('Authorization', 'Bearer ' + testUserData.token).send(validProductData).end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('error').have.property('message').eql('Cannot update product');
                done();
            });
        });
    });

    // Test /DELETE product by id route
    describe('/DELETE product by id route', () => {
        it('should successfully delete product', (done) => {
            chai.request(server).delete('/v1/products/' + testProductId).set('Authorization', 'Bearer ' + testUserData.token).send(patchProductData).end((err, res) => {
                res.should.have.status(200);
                chai.request(server).get('/v1/products/' + testProductId).send(validProductData).end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('error').have.property('message').eql('Product not found');
                    done();
                });
            });
        });
    });

    // ID not exist test
    describe('/DELETE product by id route', () => {
        it('should return error in getting product', (done) => {
            chai.request(server).delete('/v1/products/' + 'aaaaaaaaaaaaaaaaaaaaaaaa').set('Authorization', 'Bearer ' + testUserData.token).send(validProductData).end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error').have.property('message').eql('Product not found');
                done();
            });
        });
    });

    // Invalid length id test
    describe('/DELETE product by id route', () => {
        it('should return error in getting product', (done) => {
            chai.request(server).delete('/v1/products/' + 'aaaaaaa').set('Authorization', 'Bearer ' + testUserData.token).send(validProductData).end((err, res) => {
                res.should.have.status(500);
                res.body.should.have.property('error').have.property('message').eql('Cannot delete product');
                done();
            });
        });
    });

    // Test checkAuth middleware
    describe('/POST product routes to check authentication middleware', () => {
        it('should create a new product', (done) => {
            chai.request(server).post('/v1/products').set('Authorization', 'Bearer ' + 'aaaaaaaaa').send(validProductData).end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('error').have.property('message').eql('Invalid token');
                done();
            });
        });
    });
});
