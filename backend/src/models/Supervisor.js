'use strict';

const mongoose = require('mongoose');

const SupervisorSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Supervisor', SupervisorSchema);
