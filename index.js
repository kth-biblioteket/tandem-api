'use strict';

require('dotenv').config({path:'tandem-api.env'})

const jwt = require("jsonwebtoken");
const VerifyToken = require('./VerifyToken');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const fs = require("fs");
const path = require('path');
const Controller = require('./Controllers');
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

const socketIo = require("socket.io");

app.set("view engine", "ejs");

const whitelist = process.env.CORS_WHITELIST.split(", "); 
app.use(cors({origin: whitelist}));

const apiRoutes = express.Router();

apiRoutes.get("/", async function (req, res, next) {
	res.json('Welcome to KTH Biblioteket Tandem api')
});

apiRoutes.get("/languages", Controller.readLanguages)

apiRoutes.get("/offerrequest", Controller.getOfferRequest)

app.use(process.env.API_ROUTES_PATH, apiRoutes);

const server = app.listen(process.env.PORT || 3002, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});

const io = socketIo(server, {path: process.env.SOCKETIOPATH})

const sockets = {}

io.on("connection", (socket) => {
    socket.on("connectInit", (sessionId) => {
        sockets[sessionId] = socket.id
        app.set("sockets", sockets)
    })
})

app.set("io", io)

