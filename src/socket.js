import io from "socket.io-client";

export default function() {
  const socket = io.connect();
  socket.on("error", err => {
    console.error("Socket io client error");
    console.error(err);
  });

  function register(data, cb) {
    socket.emit("user.register", data, cb);
  }

  function editUser(data, cb) {
    socket.emit("user.edit", data, cb);
  }

  return {
    register,
    editUser
  };
}
