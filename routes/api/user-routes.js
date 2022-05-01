const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require("../../controllers/user-controller");

router.route("/")
    .get(getAllUsers)
    .post(addUser);
router.route("/:userId")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router.route("/:userId/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;