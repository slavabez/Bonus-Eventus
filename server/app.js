const express = require("express");
const helmet = require("helmet");
const schedule = require("node-schedule");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const ClientManager = require("./ClientManager");
const RoomManager = require("./RoomManager");
const RollManager = require("./RollManager");

// Initialize an express app with some security defaults
app
  .use(https)
  .use(helmet())
  .use(express.json());

// Serve static assets built by create-react-app
app.use(express.static("./build"));

// If no explicit matches were found, serve index.html
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.use(notFound).use(errors);

function https(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    const proto = req.headers["x-forwarded-proto"];
    if (proto === "https" || proto === undefined) {
      return next();
    }
    return res.redirect(301, `https://${req.get("Host")}${req.originalUrl}`);
  } else {
    return next();
  }
}

function notFound(req, res) {
  res.status(404).send("Not Found");
}

function errors(err, req, res) {
  console.log(err);
  res.status(500).send("something went wrong");
}

io.on("connection", clientSocket => {
  // New device connected
  console.log("New user connected", clientSocket.id);
  clientSocket.on("room.create", async data => {
    try {
      const room = await RoomManager.createNewRoom(data);
      clientSocket.emit("room.created", room);
      console.log(`Created new room called ${data}`);
      io.emit("room.allRooms", RoomManager.getRooms());
    } catch (e) {
      clientSocket.emit("room.created", false);
    }
  });
  clientSocket.on("room.listAll", () => {
    clientSocket.emit("room.allRooms", RoomManager.getRooms());
  });

  clientSocket.on("room.join", roomName => {
    console.log(`User ${clientSocket.id} joined ${roomName}`);
    // Check such room is created
    if (RoomManager.rooms.has(roomName)) {
      clientSocket.join(roomName);
      RoomManager.addUserToRoom(clientSocket, roomName);
    }
  });

  clientSocket.on("room.leave", roomName => {
    // Back to
    clientSocket.leave(roomName);
    RoomManager.removeUserFromRoom(clientSocket);
  });

  clientSocket.on("roll", message => {
    console.log("Message received", message);
    console.log("From user in groups", clientSocket.rooms);
  });
});

schedule.scheduleJob("*/15 * * * *", () => {
  // This cleaning job is run every 15 minutes
  // If a room hasn't been used in an hour, delete
  console.log(
    "---------------------------Initialing cleanup---------------------------"
  );
  RoomManager.deleteOldRooms();
});

module.exports = server;
