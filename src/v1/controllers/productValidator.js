const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addKeyword({
    async: true,
});

const productSchema = {
    $async: true,
    type: 'object',
    properties: {
        name: {type: 'string'},
        description: {type: 'string'},
        price: {type: 'number'},
        quantity: {type: 'number'},
    },
    required: ['name', 'description', 'price', 'quantity'],
};

const validate = ajv.compile(productSchema);


module.exports = validate;

