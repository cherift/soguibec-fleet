'use strict';

const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    pictures: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Document',
        },
    ],
    weight: {
        type: Number,
        default: 0,
    },
    organization: {
        type: mongoose.Types.ObjectId,
        ref: 'Driver',
        required: true,
    },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
