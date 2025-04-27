const express = require("express");
const {handleGetAllUsers,
       getUserById,
       handleUpdateUserById,
       handleDeleteUserById,
       handleCreateNewUser,
     } = require("../controllers/user");

// sepreate router created
const router = express.Router();

router
    .route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser )

// GET user by ID (from MongoDB)
router
    .route("/:id")
    .get(getUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)


module.exports = router;