const express = require("express");
const dotenv = require("dotenv")
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors")
const userRoute = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();



connectDB();
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use("/api/user", userRoute);

app.use(notFound)
app.use(errorHandler)

app.get("/api/chat" , (req, res) => {
    res.send(chats)
})

app.get("/api/chat/:id", (req, res) => {
  res.send(req);
}); 

app.listen(PORT, console.log(`server is start on Ports ${PORT}`.yellow.bold));

