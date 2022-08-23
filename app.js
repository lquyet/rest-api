const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

const productRouter = require('./src/v1/routes/productRoutes');

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Set up body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS configuration
app.use((req, res, next) => {
    // Allow any origin to access this API, for developing purposes
    // Should be set a specific origin for production
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

// Reduce Fingerprinting
app.disable('x-powered-by');

app.use('/v1/products', productRouter);

// Handle requests to invalid resources
// Also handle not-supported HTTP methods, needed to seperate from 404 error
app.use((req, res, next) => {
    const error = new Error('Invalid request! No resource was found!');
    error.status = 404; // Not Found
    next(error);
});

// Handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        'error': {
            'message': error.message,
        },
    });
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
