const express = require('express');

const algorithm = require('../utils/algorithm');
const router = express.Router();

router.get('/generate', (req, res, next) => {
    res.json({
        apiKey: algorithm.genereateApiKey(),
    });
});

module.exports = router;
