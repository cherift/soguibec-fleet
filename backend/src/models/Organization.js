'use strict';

const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: mongoose.Types.ObjectId,
        ref: 'Document',
    },
    address: {
        type: String,
    },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
