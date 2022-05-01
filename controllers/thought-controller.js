const { Thought, User } = require("../models");

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .select("-__v")
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(500).json(err));
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .select("-__v")
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with this id found!" });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(newThought => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: newThought._id}},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with that id found!" });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with that id found!" });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: "No thought with that id found!" });
                }
                return User.findOneAndUpdate(
                    { username: deletedThought.username },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true }
                )
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    return res.status(404).json({ message: "No user with that username found!" });
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body }},
            { new: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with that id found!" });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    },

    deleteReaction({ params }, res) {
        console.log(params);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId }}},
            { new: true }
        )
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: "No thought with this id found!" });
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(500).json(err));
    }
};

module.exports = thoughtController;