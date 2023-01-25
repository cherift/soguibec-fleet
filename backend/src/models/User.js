'use strict';

const mongoose = require('mongoose');
const Role = require('./Role');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters'],
    },
    organization: {
        type: mongoose.Types.ObjectId,
        ref: 'Organization',
    },
    role: {
        type: String,
        enum: Role,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthDay: {
        type: Date,
    },
    avatar: {
        type: mongoose.Types.ObjectId,
        ref: 'Document',
    },
});

module.exports = mongoose.model('User', UserSchema);
