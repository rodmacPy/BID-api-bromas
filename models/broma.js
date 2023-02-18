const { Schema, model } = require('mongoose');

const BromasSchema = Schema({
    setup: {
        type: String,
        required: [true, 'Setup obligatorio']
    },
    punchline: {
        type: String,
        required: [true, 'Punchline es obligatorio'],
    },
});

module.exports = model('Bromas', BromasSchema);