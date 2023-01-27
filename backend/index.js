'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const concatEnv = require('./src/utils/concatEnv');

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(concatEnv.concate(process.env.MONGODB), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(200).json({
        name: 'fleet management api',
        version: '1.0.0',
    });
});

app.use('/race', require('./src/routes/race'));
app.use('/driver', require('./src/routes/driver'));
app.use('/supervisor', require('./src/routes/supervisor'));
app.use('/vehicle', require('./src/routes/vehicle'));
app.use('/organization', require('./src/routes/organization'));
app.use('/apikey', require('./src/routes/apiKey'));
app.use('/user', require('./src/routes/user'));
app.use('/login', require('./src/routes/login'));

// render 404 page
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json').status(404).json({
        code: 404,
        message: 'request not found',
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Project is running on http://localhost:${PORT}`)
);
