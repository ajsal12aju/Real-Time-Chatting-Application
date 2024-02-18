const express = require("express");
const { chats } = require("./data/data");

const app = express()

app.get("/api/chat" , (req, res) => {
    res.send(chats)
})

app.get("/api/chat/:id", (req, res) => {
  res.send(req);
});

app.listen(5000, console.log("server is startted on Port 5000"));