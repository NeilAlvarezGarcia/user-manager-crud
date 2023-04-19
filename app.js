const { resolve } = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routerFront = require('./server/routes/routerFront');
const routerAPI = require('./server/routes/routerAPI');
const notFound = require('./server/routes/notFound');

// Define a port and set the app
const app = express();

// using json in the app
app.use(express.json());

// log request
app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// load assets
app.use(express.static(resolve(__dirname, 'assets')));

// router
app.use(routerFront);
app.use('/api/v1', routerAPI);
app.use(notFound)


module.exports = app;