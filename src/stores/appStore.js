import {store} from "react-easy-state";
import socket from "../socket";

const appStore = store({
  socket: socket(),
  rooms: [],
  register: (registrationInfo) => {

  },
  createNewRoom: (name) => {
    appStore.socket.emit("room.create", name);
  },
  joinRoom: (name) => {
    appStore.socket.emit("room.join", name);
  },
  sendMessage: (message) => {
    appStore.socket.emit("roll", message);
  }
});

appStore.socket.on("room.allRooms", rooms => {
  appStore.rooms = rooms;
  console.log(rooms);
});

appStore.socket.on("connect", () => {
  console.log("------------- Connected, pinging for fresh info -------------");
  // Ping for initial info
  appStore.socket.emit("room.listAll")
});

export default appStore;
