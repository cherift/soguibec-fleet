'use strict';

const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    races: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Race',
        },
    ],
    drivingLicence: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Driver', DriverSchema);
