class Room {
  constructor(name){
    this.name = name;
    this.users = [];
    this.history = [];
  }
}

class RoomManager {
  constructor(){
    this.rooms = new Map();
  }

  createNewRoom(name){
    return new Promise((resolve, reject) => {
      if (this.rooms.has(name)) reject("Room with such name already exists");
      const room = new Room(name);
      this.rooms.set(name, room);
      resolve(room);
    });
  }
}

module.exports = new RoomManager();
