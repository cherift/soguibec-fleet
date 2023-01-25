'use strict';

const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    logo: {
        type: mongoose.Types.ObjectId,
        ref: 'Document',
    },
});

module.exports = mongoose.model('Organization', OrganizationSchema);
