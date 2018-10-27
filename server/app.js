const express = require("express");
const helmet = require("helmet");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const ClientManager = require("./ClientManager");
const RoomManager = require("./RoomManager");
const { handleRegister } = require("./handlers/user");

// Initialize an express app with some security defaults
app.use(https).use(helmet()).use(express.json());

app.post("/users", (req, res) => {
  let user;
  if (!req.body.id){
    // ID passed - edit
    user = ClientManager.registerNewClient();
  } else {
    // No id, create new
    user = ClientManager.editClientUserData(req.body);
  }
  res.send(user);
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

});

module.exports = server;
