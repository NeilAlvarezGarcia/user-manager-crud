const userDB = require('../model/model');
const UserDB = require('../model/model');

// create and save new user
function createUser(req, res) {
    if(!req.body) {
        res.status(400).send({ message: 'Content cannot be empty'});
        return;    
    }

    const user = new UserDB(req.body);

    user
        .save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Ocurred an error while creating the user',
            });
        })
}

// get all users
function getAllUsers(_req, res) {
    UserDB.find()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Ocurred an error fetching all users',
            });
        })
}

// get a single user
function getUser(req, res, next) {
    const { id } = req.params;
    
    UserDB.findOne({ _id: id })
        .then(data => {
            if(!data) {
                return res.status(404).json({ msg: `No user with the id: ${id}` });
            }
            res.user = data;
            next();
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Ocurred an error while fetching the user',
            });
        })
}

// update user
function updateUser(req, res) {
    const { params: { id }, body } = req;
    console.log(id, body)
    if(!body) {
        res.status(400).send({ message: 'Content cannot be empty'});
        return;
    }
    
    userDB.findOneAndUpdate({ _id: id }, {...body, updatedAt: new Date()})
        .then(data => {
            if(!data) {
                return res.status(404).json({ msg: `No user with the id: ${id}` });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Ocurred an error while updating the user',
            });
        })
}

// delete user
function deleteUser(req, res) {
    const { id } = req.params;
    
    userDB.findOneAndDelete({ _id: id })
        .then(data => {
            if(!data) {
                return res.status(404).json({ msg: `No user with the id: ${id}` });
            }
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Ocurred an error while deleting the user',
            });
        })
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}