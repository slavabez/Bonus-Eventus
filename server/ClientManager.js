const uniqid = require("uniqid");

class User {
  constructor(props, socket){
    const { name, avatar, color } = props;
    this.id = uniqid();
    this.name = name;
    this.avatar = avatar;
    this.color = color;
    this.socketId = socket.id;
  }
}

class ClientManager {
  constructor(){
    this.allUsers = new Map();
  }

  registerNewClient(props, socket){
    const user = new User(props, socket);
    this.allUsers.set(user.id, user);
    return user;
  }

  bindNewSocketId(userId, newSocketId){
    try {
      this.findClientById(userId).socketId = newSocketId;
    } catch (e) {

    }
  }

  findClientById(id){
    if (this.allUsers.has(id)){
      return this.allUsers.get(id);
    } else {
      return null;
    }
  }

  findClientBySocketId(id){
    // Search through the array of values
    return Array.from(this.allUsers.values()).find(u => u.socketId === id);
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
