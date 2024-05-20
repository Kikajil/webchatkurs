const express = require("express");
require('dotenv').config();
const app = express();
const server = require("http").Server(app);

const { v4: uuidv4 } = require("uuid");

const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const db = require("./db");

db.sequelize.authenticate().then(() => {
   const models = require("./models/models");
});

const chatRouter = require('./routes/chatRouter');
const participantRouter = require('./routes/participantRouter');
const roomRouter = require('./routes/roomRouter');
const userRouter = require('./routes/userRouter');

app.use('/api/chats', chatRouter);
app.use('/api/participants', participantRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);



app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect(`/new?room=${uuidv4()}`);
});

app.get("/new", (req, res) => {
  if (req.query.room) {
    res.sendFile(__dirname + "/public/room.html");
  } else {
    res.redirect("/");
  }
  
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    setTimeout(()=>{
      socket.broadcast.to(roomId).emit("user-connected", userId);
    }, 1000)
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
});

server.listen(process.env.PORT || 3030);

process.on("SIGINT", () => {
  db.Mongoose.disconnect();
  db.sequelize.close();
  process.exit();
})
