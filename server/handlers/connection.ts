import * as SocketIO from "socket.io";

export function handlePing(socket: SocketIO.Socket) {
  return function(data: any, cb: any) {
    if (data.message === "Are you there?") {
      socket.emit("pong", { message: "You bet!" });
    } else {
      socket.emit("pong", { message: "New phone who dis?" });
    }

    cb(() => {
      console.log(`Got it, boss`);
    });
  };
}
