const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const userRouter = require("./routes/user")
const {connectMongoDb} = require('./connection')
const {logReqRes} = require('./middlewares') 

//Routes
app.use("/user", userRouter);

//Connection of mongoDB
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")

//
app.use(logReqRes('log.txt'));

//learning the concept of express js
const app = express();
const PORT = 8000;


//list all users as html (no use rn )
// app.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//     <ul>
//       ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
//     </ul>
//     `;
//   res.send(html);
// });



//list all user as JSON)
app.get("/api/users", async (req, res) => {
  
});

//list user with specific id matching the mock data (working)
// app.get(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     res.status(404).send({ error: "User not found" });
//   } else {
//     res.json(user);
//   }
// });

// GET user by ID (from MongoDB)
// app.get('/api/users/:id', async (req, res) => {
//   try {
//     // Check if ID is valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ error: "Invalid user ID format" });
//     }

//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Server error: Failed to fetch user" });
//   }
// });

// POST new user (to MongoDB)
app.post("/api/users", async (req, res) => {
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
    return res.status(201).json({ msg: "success", data: result }); // Corrected syntax
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});



//currently listening on radio station as we mentioned above with the tag line not radio mirchi but server started at port
app.listen(PORT, () => console.log(`Server started at port: ${PORT} `));
