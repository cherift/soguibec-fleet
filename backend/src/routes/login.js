const express = require('express');

const User = require('../models/User');
const algorithm = require('../utils/algorithm');
const router = express.Router();

router.get('/', (req, res, next) => {
    const { login, password } = req.body;

    if (!login || !password) {
        res.status(401).json({
            error: true,
            errorMessage: 'Missing login or password in parameter',
        });
        return;
    }

    User.findOne({ login: login })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    error: true,
                    errorMessage: 'No user exists with the login name',
                });
                return;
            }
            console.log(user);
            if (user.password !== algorithm.md5(password)) {
                res.status(401).json({
                    error: true,
                    errorMessage: 'Invalid password',
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'login successed',
            });
            return;
        })
        .catch((e) =>
            res.status(500).json({
                error: true,
                errorMessage: 'login failed',
                dataError: e,
            })
        );
});

module.exports = router;
