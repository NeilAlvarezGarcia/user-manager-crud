const express = require('express');
const routerFront = express.Router();

const { getUser } = require('../controller/controller');
const renderView = require('../services/render');

// routing the frontend
routerFront.route('/').get(renderView('index'));
routerFront.route('/adduser').get(renderView('add_user'));
routerFront.route('/:id').get(getUser, renderView('update_user'));

module.exports = routerFront;