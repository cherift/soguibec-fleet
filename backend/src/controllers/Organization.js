'use strict';

const dotenv = require('dotenv');

const Organization = require('../models/Organization');
const Document = require('../models/Document');
const Role = require('../models/Role');
const algorithm = require('../utils/algorithm');
const User = require('../models/User');
const Admin = require('../models/Admin');

dotenv.config();

const addOrganization = async (req, res, next) => {
    if (!process.env.APIKEY || !req.body.apiKey) {
        res.status(401).json({
            error: true,
            errorMessage: 'Api key is not setted in configuration',
        });
        return;
    }
    if (process.env.APIKEY !== req.body.apiKey) {
        res.status(401).json({
            error: true,
            errorMessage: 'You are not authorized to create new organization',
        });
        return;
    }

    try {
        let image, iamgeSaved;
        if (req.body.logo && req.body.logo.data) {
            image = new Document(req.body.logo);
            iamgeSaved = image && (await image.save());
        }
        const organization = new Organization({
            name: req.body.name,
            address: req.body.address,
        });
        if (iamgeSaved) {
            organization.logo = iamgeSaved._id;
        }
        const result = await organization.save();

        //creating first organisation user as admin
        const password = algorithm.gereratePassword(10);
        const amdinUser = {
            login: ('admin-' + req.body.name).replace(/ /g, '').toLowerCase(),
            password: algorithm.md5(password),
            firstName: req.body.name,
            lastName: req.body.name,
            organization: result._id,
            role: Role.ADMIN,
        };
        const userCreated = await new User(amdinUser).save();

        if (!userCreated) {
            res.status(401).json({
                error: true,
                errorMessage: 'Enable to create user',
            });
            return;
        }

        const adminCreated = await new Admin({
            profile: userCreated._id,
        }).save();

        if (!adminCreated) {
            res.status(401).json({
                error: true,
                errorMessage: 'Enable to create user',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'new organization created',
            data: {
                organization: result,
                admin: {
                    login: amdinUser.login,
                    password: password,
                },
            },
        });
    } catch (e) {
        res.status(401).json({
            error: true,
            errorMessage: `Something went wrong or an organization with name ${req.body.name} surely exists.`,
            dataError: e,
        });
    }
};

const getOrganization = async (req, res, next) => {
    try {
        const id = req.params.id;
        const organization = await Organization.findById(id);
        if (organization) {
            res.status(200).json({
                success: true,
                message: 'Organization found',
                data: organization,
            });
        }
    } catch (e) {
        res.status(401).json({
            error: true,
            errorMessage: 'Unable to find organization',
            dataError: e,
        });
    }
};

const updateOrganization = (req, res, next) => {};

module.exports = {
    addOrganization: addOrganization,
    getOrganization: getOrganization,
    updateOrganization: updateOrganization,
};
