const express = require("express");
const dotenv = require("dotenv")
const { chats } = require("./data/data");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000


app.get("/api/chat" , (req, res) => {
    res.send(chats)
})

app.get("/api/chat/:id", (req, res) => {
  res.send(req);
});

app.listen(PORT, console.log(`server is startted on Ports ${PORT}`));

