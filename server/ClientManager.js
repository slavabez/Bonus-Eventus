const uniqid = require("uniqid");

class User {
  constructor(props) {
    const { name, avatar, color, socketId } = props;
    this.id = uniqid();
    this.name = name;
    this.avatar = avatar;
    this.color = color;
    this.socketId = socketId;
  }
}

class ClientManager {
  constructor() {
    this.currentUsers = new Map();
  }

  registerNewClient(props) {
    const user = new User(props);
    this.currentUsers.set(user.id, user);
    return user;
  }

  updateSocketId(userId, newSocketId) {
    try {
      if (this.currentUsers.has(userId))
        this.currentUsers.get(userId).socketId = newSocketId;
    } catch (e) {
      console.error(`Error updating the socket ID for user with ID ${userId}`);
    }
  }

  findClientById(id) {
    if (this.currentUsers.has(id)) {
      return this.currentUsers.get(id);
    } else {
      return null;
    }
  }

  findClientBySocketId(id) {
    // Search through the array of values
    return Array.from(this.currentUsers.values()).find(u => u.socketId === id);
  }

  getUserIdFromSocketId(socketId) {
    // Pray this works
    return Array.from(this.currentUsers.values()).find(
      u => u.socketId === socketId
    ).id;
  }

  removeClient(id) {
    if (this.currentUsers.has(id)) this.currentUsers.delete(id);
  }
}

module.exports = new ClientManager();
