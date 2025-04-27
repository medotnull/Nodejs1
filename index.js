const express = require("express");
const {connectMongoDB} = require('./connection')

//custom middleware for logging
const {logReqRes} = require('./middlewares') 

//router for user-related end points
const userRouter = require("./routes/user")

//initialise express
const app = express();
const PORT = 8000;

//Routes
app.use("/api/users", userRouter);

//Connection of mongoDB
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(() =>
  console.log("MongoDB Connected!!!!!")
) 

//Middleware 
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt')); //create log entries in 'log.txt' file for all incoming request


//currently listening on radio station as we mentioned above with the tag line not radio mirchi but server started at port
app.listen(PORT, () => console.log(`Server started at port: ${PORT} `));
