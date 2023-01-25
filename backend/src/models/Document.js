'use strict';

const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    data: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Document', DocumentSchema);
