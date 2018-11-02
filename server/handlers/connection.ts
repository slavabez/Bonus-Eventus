import * as SocketIO from "socket.io";

export function handlePing(socket: SocketIO.Socket) {
  return function(data: any) {
    console.log`Received a ping request...`;
    if (data.message === "Are you there?") {
      socket.emit("server.pong", { message: "You bet!" });
    } else {
      socket.emit("server.pong", { message: "New phone who dis?" });
    }
  };
}
