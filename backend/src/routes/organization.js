const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => res.json({ error: false }));

module.exports = router;
