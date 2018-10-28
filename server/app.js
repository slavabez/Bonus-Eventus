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
  // New device connected
  console.log("New user connected", clientSocket.id);

  // Registration stuff
  clientSocket.on("register.new", props => {
    props.socketId = clientSocket.id;
    const user = ClientManager.registerNewClient(props);
    clientSocket.emit("register.success", user);
    console.log(
      `Registered a new user ${user.name} with gen ID ${
        user.id
      } and socket ID ${user.socketId}`
    );
  });
  clientSocket.on("register.restore", id => {
    // Try to find user with the ID
    const user = ClientManager.findClientById(id);
    if (user) {
      // Update the new socket ID
      ClientManager.updateSocketId(id, clientSocket.id);
      console.log(`Updated socket ID for user ${id}`);
      clientSocket.emit("register.success", user);
    } else {
      clientSocket.emit("register.restore.failed");
    }
  });

  // Rooms, joining and leaving
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
    // Check such room is created
    if (RoomManager.rooms.has(roomName)) {
      clientSocket.join(roomName);
      // Find actual user
      const user = ClientManager.findClientBySocketId(clientSocket.id);
      RoomManager.addUserToRoom(user, roomName);
      console.log(`User ${clientSocket.id} joined ${roomName}`);
      // Broadcast to all members in the room a list of all connected users
      io.to(roomName).emit(
        "room.players",
        RoomManager.getUsersInRoom(roomName)
      );
    }
  });
  clientSocket.on("test", () => {
    const user = ClientManager.findClientBySocketId(clientSocket.id);
    console.log(`Got this User with your socket (${clientSocket.id})`, user);
  });
  clientSocket.on("room.leave", roomName => {
    // Back to
    clientSocket.leaveAll();
    const user = ClientManager.findClientBySocketId(clientSocket.id);
    RoomManager.removeUserFromRoom(user.id, roomName);
    console.log(`User ${clientSocket.id} left ${roomName}`);
    // Broadcast updated list
    io.to(roomName).emit(
      "room.players",
      RoomManager.getUsersInRoom(roomName)
    );
  });

  // Rolling the dice
  clientSocket.on("roll", async rollString => {
    console.log("Message received", rollString);
    console.log("From user in groups", clientSocket.rooms);

    // 1. Get the player data, name, avatar and color and room
    // 2. Process the roll, get result
    // 3. Determine which room to broadcast to and broadcast
    const player = ClientManager.findClientBySocketId(clientSocket.id);
    // If no player found - unauthorised roll - ignore
    if (!player) return;
    // If the roll doesn't belong to a room, ignore too
    if (Object.keys(clientSocket.rooms).length < 2) return;
    // Extract the room name that isn't the same as ID
    const rooms = Object.values(clientSocket.rooms);
    const roomName = rooms.find(r => r !== clientSocket.id);
    const rollMessage = await RollManager.roll(rollString, player, roomName);
    // Add message to the room
    RoomManager.postRollMessage(rollMessage, roomName);
    // Broadcast to everyone in the room, including the sender
    io.to(roomName).emit("roll.new", rollMessage);

    console.log(`Roll came from user ${player.name} in room ${roomName}`);
  });

  clientSocket.on("disconnect", reason => {
    console.log(`${clientSocket.id} disconnected`, reason);
    const user = ClientManager.findClientBySocketId(clientSocket.id);
    if (user) {
      console.log(`User left, we found him, kick him from rooms`, user);
      RoomManager.removeFromAllRooms(user.id);
      // Broadcast to all rooms with updated userlist
      RoomManager.updateRooms(io);
    }
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
