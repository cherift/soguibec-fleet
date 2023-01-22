"use strict";

const dotenv = require("dotenv");
dotenv.config();

const concate = (env) =>
    env
        .split("$")
        .map((value) => (process.env[value] ? process.env[value] : value))
        .join("");

module.exports = {
    concate: concate,
};
