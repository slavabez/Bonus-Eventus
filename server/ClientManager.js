const uniqid = require("uniqid");

class User {
  constructor(){
    this.id = uniqid();
    this.name = "The White Wizard";
    this.avatar = "avatar1.png";
    this.color = "#ff76fb";
    this.socket = null;
  }
}

class ClientManager {
  constructor(){
    this.allUsers = new Map();
  }

  registerNewClient(socket){
    const user = new User();
    socket.user = user;
    user.socket = socket;
    this.allUsers.set(user.id, user);
    return user;
  }


  editClientUserData(data){
    let user = this.allUsers.get(data.id);
    if (data.name) user.name = data.name;
    if (data.avatar) user.avatar = data.avatar;
    if (data.color) user.color = data.color;
    this.allUsers.set(data.id, user);
    return user;
  }
}

module.exports = new ClientManager();
