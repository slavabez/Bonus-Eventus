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
  rollHistory: [],
  roommates: [],
  error: "",
  register: registrationInfo => {
    appStore.socket.emit("register.new", registrationInfo);
    console.log(`Sent request to register user ${registrationInfo.name}`);
  },
  logout: () => {
    Cookie.remove("player_id");
    appStore.currentUser = {
      name: "",
      avatar: "",
      color: ""
    };
    appStore.leaveRoom(appStore.inRoom);
    appStore.socket.emit("register.delete");
  },
  createNewRoom: name => {
    appStore.socket.emit("room.create", name);
  },
  joinRoom: name => {
    appStore.socket.emit("room.join", name);
    // Load the messages from that room, if any
    appStore.rollHistory = appStore.rooms.find(r => r.name === name).history;
    appStore.inRoom = name;
    console.log(
      `Joined room "${name}", found and loaded ${
        appStore.rollHistory.length
      } rolls into history...`
    );
  },
  leaveRoom: name => {
    appStore.socket.emit("room.leave", name);
    appStore.inRoom = false;
    appStore.roommates = [];
  },
  refreshRooms: () => {
    appStore.socket.emit("room.listAll");
  },
  sendRoll: message => {
    appStore.socket.emit("roll", message);
  },
  reconnect: () => {
    appStore.socket.disconnect();
    appStore.socket.connect();
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
  console.log("Connected to server, beginning initial data grab");
  // Ping for initial info
  // Load rooms
  appStore.socket.emit("room.listAll");

  // See if a cookie is saved with user id - if yes, use it to register
  const savedId = Cookie.get("player_id");
  if (savedId) {
    // attempt to re-assign user if it still exists
    appStore.socket.emit("register.restore", savedId);
    console.log(`Found player's previous data - loading...`);
  }
});

appStore.socket.on("room.allRooms", rooms => {
  appStore.rooms = rooms;
});

appStore.socket.on("register.restore.failed", () => {
  // Tried restoring user - failed, likely cause server forgot the player (rebooted)
  appStore.error = "Error loading saved player, please create a new player";
  // Delete the old coolie
  Cookie.remove("player_id");
  console.log(`Failed to load saved player data - removing cookie...`);
});

appStore.socket.on("roll.new", rollResult => {
  console.log(`------ Got a new roll for this room ------`, rollResult);

  // If more than 50 messages - delete old
  if (appStore.rollHistory.length > 49) {
    appStore.rollHistory = appStore.rollHistory.slice(
      appStore.rollHistory.length - 49
    );
  }

  appStore.rollHistory.push(rollResult);
});

appStore.socket.on("room.players", players => {
  console.log(`Received a new list of players in our room:`, players);
  appStore.roommates = players;
});

export default appStore;
