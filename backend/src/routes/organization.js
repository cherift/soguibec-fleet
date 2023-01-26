'use strict';

const express = require('express');
const Organization = require('../controllers/Organization');

const router = express.Router();

router.post('/', Organization.addOrganization);
router.get('/:id', Organization.getOrganization);

module.exports = router;
