const express = require("express");
const fs = require("fs");
const users = require('./MOCK_DATA.json')
const path = require('path');
const filePath = path.join(__dirname, 'MOCK_DATA.json');

//learning the concept of express js
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false}));
app.use(express.json()); 

//list all users as html (working)
app.get('/users', (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

//list all user as JSON (working))
app.get('/api/users', (req,res) => {
    return res.json(users);
})

//list user with specific id matching the mock data (working)
app.get("/api/users/:id", (req, res) =>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) {
        res.status(404).send({ error: 'User not found' });
      } else {
        res.json(user);
      }
});

// app.post("/api/users/:id", (req, res) =>{
//   return res.json({status: "pending"});
// });


//using post ie creating a user that makes already users + 1, using postman (not working)
// app.post("/api/users",(req, res) => {
//   const body = req.body;
//   users.push({...body, id: users.length + 1});
//   fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//       return res.json({status: "pending"});
//   })
  
// });

app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;

    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({ status: "error", message: "Invalid request body" });
    }

    
    const data = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(data);

    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return res.status(201).json({ status: "success", user: newUser });
  } catch (err) {
    console.error("Error handling /api/users:", err);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

//currently listening on radio station as we mentioned above with the tag line not radio mirchi but server started at port 
app.listen(PORT, () => console.log(`Server started at port: ${PORT} `))

