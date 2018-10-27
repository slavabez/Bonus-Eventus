import { store } from "react-easy-state";
import Cookie from "js-cookie";
import socket from "../socket";

const appStore = store({
  socket: socket(),
  rooms: [],
  currentUser: {
    name: "",
    avatar: "",
    color: ""
  },
  inRoom: false,
  error: "",
  register: registrationInfo => {
    appStore.socket.emit("register.new", registrationInfo);
  },
  createNewRoom: name => {
    appStore.socket.emit("room.create", name);
  },
  joinRoom: name => {
    appStore.socket.emit("room.join", name);
    appStore.inRoom = name;
  },
  leaveRoom: name => {
    appStore.socket.emit("room.leave", name);
    appStore.inRoom = false;
  },
  sendMessage: message => {
    appStore.socket.emit("roll", message);
  }
});

appStore.socket.on("room.allRooms", rooms => {
  appStore.rooms = rooms;
  console.log(rooms);
});

appStore.socket.on("register.success", user => {
  const { name, avatar, id, color } = user;
  appStore.currentUser = {
    name,
    avatar,
    id,
    color
  };
  // Save a cookie to be able to restore next time after page reload
  Cookie.set("player_id", id, { expires: 7 });
});

appStore.socket.on("connect", () => {
  console.log("------------- Connected, pinging for fresh info -------------");
  // Ping for initial info
  // Load rooms
  appStore.socket.emit("room.listAll");

  // See if a cookie is saved with user id - if yes, use it to register
  const savedId = Cookie.get("player_id");
  if (savedId) {
    // attempt to re-assign user if it still exists
    appStore.socket.emit("register.restore", savedId);
  }
});

appStore.socket.on("register.restore.failed", () => {
  // Tried restoring user - failed, likely cause server forgot the player (rebooted)
  appStore.error = "Error loading saved player, please create a new player";
});

appStore.socket.on("roll.new", rollResult => {
  console.log(`------ Got a new roll for this room ------`, rollResult);
});

export default appStore;
