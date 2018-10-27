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

app.post("/users", (req, res) => {
  let user;
  if (!req.body.id) {
    // ID passed - edit
    user = ClientManager.registerNewClient();
  } else {
    // No id, create new
    user = ClientManager.editClientUserData(req.body);
  }
  res.send(user);
});

app.post("/rooms", async (req, res) => {
  try {
    const room = await RoomManager.createNewRoom(req.body.name);
    res.send(room);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .send({
        error:
          "Error creating a new room. Make sure no room with such name already exists"
      });
  }
});

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
  console.log("New user connected");
  clientSocket.on("room.create", async data => {
    try {
      const room = await RoomManager.createNewRoom(data.name);
      clientSocket.emit("room.created", room);
      io.emit("room.allRooms", RoomManager.getRooms());
    } catch (e) {
      clientSocket.emit("room.created", false);
    }
  });
  clientSocket.on("room.listAll", () => {
    clientSocket.emit("room.allRooms", RoomManager.getRooms());
  });

  clientSocket.on("room.join", (roomName) => {
    // Check such room is created
    if (RoomManager.rooms.has(roomName)){
      clientSocket.join(roomName, () => {});
    }
  });

  clientSocket.on("room.leave", (roomName) => {
    // Back to
  });

});

schedule.scheduleJob("*/15 * * * *", () => {
  // This cleaning job is run every 15 minutes
  // If a room hasn't been used in an hour, delete
  console.log("---------------------------Initialing cleanup---------------------------");
  RoomManager.deleteOldRooms();
});

module.exports = server;
