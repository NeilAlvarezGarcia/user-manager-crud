
// routing API
const express = require('express');
const { createUser, getAllUsers, getUser, deleteUser, updateUser } = require('../controller/controller');

const routerAPI = express.Router();

routerAPI.route('/users').get(getAllUsers).post(createUser);
routerAPI.route('/users/:id').get(getUser).delete(deleteUser).put(updateUser);

module.exports = routerAPI;
