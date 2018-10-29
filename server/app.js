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
app.use(express.static("build"));

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
  // Registration stuff
  clientSocket.on("register.new", props => {
    // New registration, create a user, save in-memory
    props.socketId = clientSocket.id;
    const user = ClientManager.registerNewClient(props);
    clientSocket.emit("register.success", user);
    /*console.log(
      `Registered a new user ${user.name} with gen ID ${
        user.id
      } and socket ID ${user.socketId}`
    );*/
  });

  clientSocket.on("register.restore", id => {
    // Restore the user using the ID of the user (not socket)
    const user = ClientManager.findClientById(id);
    if (user) {
      // Update the new socket ID
      ClientManager.updateSocketId(id, clientSocket.id);
      clientSocket.emit("register.success", user);
    }
  });

  clientSocket.on("register.delete", () => {
    // Delete user from memory
    const user = ClientManager.findClientBySocketId(clientSocket.id);
    ClientManager.removeClient(user.id);
  });

  // Rooms, joining and leaving
  clientSocket.on("room.create", async data => {
    try {
      const room = await RoomManager.createNewRoom(data);
      clientSocket.emit("room.created", room);
      io.emit("room.allRooms", RoomManager.getRooms());
    } catch (e) {
      console.error("Error creating a new room", e);
    }
  });

  clientSocket.on("room.listAll", () => {
    // Request to get all rooms, comply
    clientSocket.emit("room.allRooms", RoomManager.getRooms());
  });

  clientSocket.on("room.join", roomName => {
    // Join a socket.io room as well as in-memory room
    // Check such room is created
    if (RoomManager.rooms.has(roomName)) {
      clientSocket.join(roomName);
      // Find actual user
      const user = ClientManager.findClientBySocketId(clientSocket.id);
      RoomManager.addUserToRoom(user, roomName);
      // console.log(`User ${clientSocket.id} joined ${roomName}`);
      // Broadcast to all members in the room a list of all connected users
      io.to(roomName).emit(
        "room.players",
        RoomManager.getUsersInRoom(roomName)
      );
    }
  });

  clientSocket.on("room.leave", roomName => {
    // Similar to join, leave socket.io rooms and our in-memory rooms
    clientSocket.leaveAll();
    const user = ClientManager.findClientBySocketId(clientSocket.id);
    RoomManager.removeUserFromRoom(user.id, roomName);
    // console.log(`User ${clientSocket.id} left ${roomName}`);
    // Broadcast updated list
    io.to(roomName).emit("room.players", RoomManager.getUsersInRoom(roomName));
  });

  // Rolling the dice
  clientSocket.on("roll", async rollString => {
    const player = ClientManager.findClientBySocketId(clientSocket.id);
    // If no player found - unauthorised roll - ignore
    if (!player) return;
    // If the roll doesn't belong to a room, ignore too
    // if (Object.keys(clientSocket.rooms).length < 2) return;
    // Extract the room name that isn't the same as ID
    const rooms = Object.values(clientSocket.rooms);
    const roomName = rooms.find(r => r !== clientSocket.id);
    // Check the room with such name exists
    if (RoomManager.rooms.has(roomName)) {
      const rollMessage = await RollManager.roll(rollString, player, roomName);
      // Add message to the room
      RoomManager.postRollMessage(rollMessage, roomName);
      // Broadcast to everyone in the room, including the sender
      io.to(roomName).emit("roll.new", rollMessage);
      // console.log(`Roll came from user ${player.name} in room ${roomName}`);
    }
  });

  clientSocket.on("disconnect", reason => {
    // Client disconnected, make sure they leave rooms properly
    // console.log(`${clientSocket.id} disconnected`, reason);
    const user = ClientManager.findClientBySocketId(clientSocket.id);
    if (user) {
      // console.log(`User left, we found him, kick him from rooms`, user);
      RoomManager.removeFromAllRooms(user.id);
      // Broadcast to all rooms with updated userlist
      RoomManager.updateRooms(io);
    }
  });
});

schedule.scheduleJob("*/15 * * * *", () => {
  // This cleaning job is run every 15 minutes
  // If a room hasn't been used in an hour, delete
  RoomManager.deleteOldRooms(io);
});

module.exports = server;
