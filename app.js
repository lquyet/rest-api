const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const productRouter = require('./src/v1/routes/productRoutes');

// Reduce Fingerprinting
app.disable('x-powered-by');

app.use('/v1/products', productRouter);

app.listen(port, () => {
    console.log('Server started on port ' + port);
});
