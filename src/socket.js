import io from "socket.io-client";

export default function() {
  const socket = io.connect();
  // console.log(`Initialing socket.io connection`);
  socket.on("error", err => {
    console.error("Socket io client error");
    console.error(err);
  });

  return socket;
}
