const express = require("express");
const dotenv = require("dotenv")
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors")
const userRoute = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes =require('./routes/messageRoutes')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require('path')
const fs = require("fs");



dotenv.config();
connectDB();
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use("/api/user", userRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// const __dirname1 = path.resolve()

// if (process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname1, '/frontend/build')))

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1,".." ,"frontend", "build", "index.html"))
//   })
// }else{
//   app.get("/" , (req,res) => {
//     res.send("API is running successFully")
//   })
// }
  
const isProduction = process.env.NODE_ENV === "production";
const buildPath = path.join(__dirname, "..", "frontend", "build"); // Adjusted path

if (isProduction) {
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    app.get("*", (req, res) => {
      const indexPath = path.resolve(buildPath, "index.html"); // Corrected path resolution
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error(`File not found: ${indexPath}`);
        res.status(404).send("Index file not found");
      }
    });
  } else {
    console.error(`Build directory not found: ${buildPath}`);
    // Handle the case where the build directory does not exist
    app.get("*", (req, res) => {
      res.status(404).send("Build directory not found");
    });
  }
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}
  app.use(notFound);
app.use(errorHandler)

app.get("/api/chat" , (req, res) => { 
    res.send(chats)
})
    
app.get("/api/chat/:id", (req, res) => {
  res.send(req);
}); 

 const server =  app.listen(PORT, console.log(`server start on Ports ${PORT}`.yellow.bold));

 const io = require("socket.io")(server, {
   pingTimeout: 60000,
   cors: {
     origin: "http://localhost:3000",
   },
 });

 io.on("connection", (socket)=> {
  console.log("connectted to socket.io")

  socket.on("setup", (userData)=>{
    socket.join(userData?._id);
    console.log(userData?._id)
    socket.emit("connected")
  })

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("user join room", room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"))
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecived) => {
      var chat = newMessageRecived.chat;

      if (!chat.users) return console.log("chat.users is not defaind");
      chat.users.forEach((user) => {
        if (user._id == newMessageRecived.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecived);
      });
    });

socket.off("setup", () => {
 console.log("user disconnected")
 socket.leave(userData._id)
})

 })
