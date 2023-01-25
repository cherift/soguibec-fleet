'use strict';

const express = require('express');
const Organization = require('../controllers/Organization');

const router = express.Router();

router.post('/', Organization.addOrganization);

module.exports = router;
