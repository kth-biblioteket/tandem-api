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

async function getOfferRequest(req, res) {
    try {
        let html = 
        `<h1 class="title">Speaks/Wants</h1>
        <br>
        <table width="100%" border="1"> 
            <tr>
                <td> Language </td>
                <td align="center"> Speaks </td>
                <td align="center"> Wants </td>                    
            </tr>`;
        let languages = await eventModel.readLanguages()
        for(i=0 ; i < languages.length; i++) {
            console.log("before")
            console.log(new Date())
            let howmanyspeak = await eventModel.readHowManySpeak(languages[i].id)
            let howmanywant = await eventModel.readHowManyWant(languages[i].id)
            console.log("after")
            console.log(new Date())
            html += 
            `<tr>
                <td>${languages[i].name_en}</td>
                <td align="center">${howmanyspeak[0].speaks}</td>
                <td align="center">${howmanywant[0].wants}</td>
            </tr>`;
        }
        html += 
        `</table>`

        res.send(html)
    } catch (err) {
        res.send("error: " + err)
    }
}

module.exports = {
    readLanguages,
    getOfferRequest
};
