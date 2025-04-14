// const express = require("express");
// const fs = require("fs");
// const users = require('./MOCK_DATA.json')
// const app = express();
// const PORT = 8000;

// //routes
// app.use(express.urlencoded({ extended: false}));
// app.use(express.json()); 

// app.get('/users', (req,res) => {
//     const html = `
//     <ul>
//     ${users.map(user => `<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// });

// app.get('/api/users', (req,res) => {
//     return res.json(users);
// })

// app.get("/api/users/:id", (req, res) =>{
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     if (!user) {
//         res.status(404).send({ error: 'User not found' });
//       } else {
//         res.json(user);
//       }
// });



//  app.listen(PORT, () => console.log(`Server started at port: ${PORT} `))

const express = require("express");
const users = require("./MOCK_DATA.json");

//learning the concept of express js 
const app = express();
const PORT = 8000;

//list all user as JSON (working))
app.get("/api/users", (req, res) => {
  res.json(users);
});

//list user with specific id matching the mock data (not working)
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});


//list all users as html (working)
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user ) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

//using post ie creating a user that makes already users + 1, using postman (not working)
app.post("/api/users",(req, res) => {
  const body = req.body;
  users.push({...body, id: users.length + 1});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
      return res.json({status: "pending"});
  })
  
});

//currently listening on radio station as we mentioned above with the tag line not radio mirchi but server started at port 
app.listen(PORT, () => {
  console.log(` Server started at port: ${PORT}`);
});