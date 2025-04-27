const User = require("../models/user");


//controllers are these making manipulation on model that is just one => User 
async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers)
}

async function getUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {lastname: "Changed"});
    return res.json({status: "Success"})
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"})
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    
    // Check for missing fields ✅
    if (
      !body ||
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.gender ||
      !body.jobTitle 
    ) {
      // Return error if validation fails
      return res.status(400).json({ error: "All fields are required" });
    }
  
    // Create user if validation passes ✅
    try {
      const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,
      });
  
      console.log("result", result);
      return res.status(201).json({ msg: "success", id: result._id }); // Corrected syntax
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };


module.exports = {
    handleGetAllUsers,
    getUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}