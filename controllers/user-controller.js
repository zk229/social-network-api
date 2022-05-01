const { User } = require("../models");

const userController = {
    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    // GET a single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: "friends",
                select: "-__v"
            })
            .populate({
                path: "thoughts",
                select: "-__v"
            })
            .select("-__v")
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with this id found!" });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    // CREATE a new user
    addUser({ params, body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },

    // UPDATE a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            body,
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with this id found!" });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    // DELETE a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with this id found!" });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with this id found!" });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with this id found!" });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    }
};

module.exports = userController;