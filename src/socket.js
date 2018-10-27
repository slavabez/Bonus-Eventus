import io from "socket.io-client";

export default function() {
  const socket = io.connect();
  socket.on("error", err => {
    console.error("Socket io client error");
    console.error(err);
  });

  return {};
}
