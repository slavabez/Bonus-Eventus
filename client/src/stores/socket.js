import io from "socket.io-client";

const conn = io.connect();
conn.on("error", err => {
  console.error("Socket.IO connection error", err);
});

export default conn;
