const Ajv = require('ajv');
const ajv = new Ajv();

ajv.addKeyword({
    async: true,
});

const emailPattern = '^[-!#$%&\'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+$';

const userSchema = {
    $async: true,
    type: 'object',
    properties: {
        email: {
            type: 'string', maxLength: 50,
            pattern: emailPattern,
        },
        password: {type: 'string', maxLength: 50, minLength: 8},
    },
    required: ['email', 'password'],
    additionalProperties: false,
};


const validate = ajv.compile(userSchema);

module.exports = {
    validate,
};

