'use strict';

const mongoose = require('mongoose');
const Status = require('./Status');

const RaceSchema = new mongoose.Schema(
    {
        driver: {
            type: mongoose.Types.ObjectId,
            ref: 'Driver',
            required: true,
        },
        vehicle: {
            type: mongoose.Types.ObjectId,
            ref: 'Vehicle',
            required: true,
        },
        supervisor: {
            type: mongoose.Types.ObjectId,
            ref: 'Supervisor',
        },
        content: {
            type: String,
            required: true,
        },
        departurePosition: {
            type: Number,
        },
        arrivalPosition: {
            type: Number,
        },
        departureWeight: {
            type: Number,
            required: true,
        },
        arrivalWeight: {
            type: Number,
        },
        shippingStatus: {
            type: String,
            enum: Status.shippingStatus,
        },
        fleetStatus: {
            type: String,
            enum: Status.fleetStatus,
        },
        comments: [
            {
                message: {
                    type: String,
                },
                date: {
                    type: Date,
                },
            },
        ],
        pictures: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Document',
            },
        ],
    },
    {
        timestamps: {
            createdAt: 'created_at', // Use `created_at` to store the created date
            updatedAt: 'updated_at', // and `updated_at` to store the last updated date
        },
    }
);

module.exports = mongoose.model('Race', RaceSchema);
