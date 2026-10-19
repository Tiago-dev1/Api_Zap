const express = require('express');
const cors = require('cors');

const authRoute = require('./routes/auth.route.js');

const APP = express();

APP.use(cors());
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

APP.use(authRoute);

const PORT = 3000;
const SERVER = "localhost";
const MSG = `Servidor online em http://${SERVER}:${PORT}`;

APP.listen(PORT, () => console.log(MSG));