const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addKeyword({
    async: true,
});

const productSchema = {
    $async: true,
    type: 'object',
    properties: {
        name: {type: 'string', maxLength: 100},
        description: {type: 'string', maxLength: 500},
        price: {type: 'number'},
        quantity: {type: 'number'},
    },
    required: ['name', 'description', 'price', 'quantity'],
    additionalProperties: false,
};

const productUpdateSchema = {
    $async: true,
    type: 'object',
    properties: {
        name: {type: 'string', maxLength: 100},
        description: {type: 'string', maxLength: 500},
        price: {type: 'number'},
        quantity: {type: 'number'},
    },
    additionalProperties: false,
};

const validate = ajv.compile(productSchema);
const validateUpdate = ajv.compile(productUpdateSchema);

module.exports = {
    validate,
    validateUpdate,
};

