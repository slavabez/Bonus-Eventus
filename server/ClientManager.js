const uniqid = require("uniqid");

class User {
  constructor(){
    this.id = uniqid();
    this.name = "The White Wizard";
    this.avatar = "avatar1.png";
    this.color = "#ff76fb";
  }
}

class ClientManager {
  constructor(){
    this.allUsers = new Map();
  }

  registerNewClient(clientSocket){
    const user = new User();
    this.allUsers.set(user.id, user);
    clientSocket.emit("user.registered", user);
  }

  handleEditClient(data, cb){
    let user = this.allUsers.get(data.id);
    if (data.name) user.name = data.name;
    if (data.avatar) user.avatar = data.avatar;
    if (data.color) user.color = data.color;
    this.allUsers.set(data.id, user);

    return cb(null, user);
  }

  editClientUserData(socket, data){

  }
}

module.exports = new ClientManager();
