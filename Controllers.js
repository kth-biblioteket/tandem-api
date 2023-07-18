require('dotenv').config()

const eventModel = require('./Models');

const axios = require('axios')
const fs = require("fs");
const path = require('path');

const cookieParser = require('cookie-parser');

async function readLanguages(req, res) {
    try {
        let result = await eventModel.readLanguages()
        res.send(result)
    } catch (err) {
        res.send("error: " + err)
    }
}

module.exports = {
    readLanguages
};
