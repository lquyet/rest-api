const express = require('express');

const morgan = require('morgan');

const app = express();

const port = process.env.PORT || 3000;

const productRouter = require('./src/v1/routes/productRoutes');

// Use morgan to log requests to the console
app.use(morgan('dev'));

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
