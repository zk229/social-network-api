const { User } = require("../models");

const userController = {
    getAllUsers(req, res) {

    },

    getUserById({ params }, res) {

    },

    addUser({ params, body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    updateUser({ params, body }, res) {

    },

    deleteUser({ params, body }, res) {

    },

    addFriend({ params }, res) {

    },

    removeFriend({ params }, res) {
        
    }
};

module.exports = userController;