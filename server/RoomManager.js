class Room {
  constructor(name) {
    this.name = name;
    this.users = new Map();
    this.history = [];
    this.createdAt = new Date();
  }
}

class RoomManager {
  constructor() {
    this.rooms = new Map();
  }

  createNewRoom(name) {
    return new Promise((resolve, reject) => {
      if (this.rooms.has(name)) reject("Room with such name already exists");
      const room = new Room(name);
      this.rooms.set(name, room);
      resolve(room);
    });
  }

  getRooms() {
    return Array.from(this.rooms.values());
  }

  addUserToRoom(user, roomName) {
    const room = this.rooms.get(roomName);
    room.users.set(user.id, user);
  }

  postRollMessage(rollMessage, roomName){
    const room = this.rooms.get(roomName);
    // If array has 20 elements or more - delete older to keep 19 newest
    if (room.history.length > 19) {
      room.history = room.history.slice(room.history.length - 19);
    }
    room.history.push(rollMessage);
    console.log(`Roll result added to room ${roomName}, has ${room.history.length} items in it`);
  }

  removeUserFromRoom(user, roomName) {
    if (this.rooms.has(roomName)) {
      const room = this.rooms.get(roomName);
      if (room.users.has(user.id)) {
        this.rooms.get(roomName).users.delete(user.id);
      }
    }
  }

  deleteOldRooms() {
    let count = 0;
    for (const key of this.rooms.keys()) {
      // First, check if there are any messages
      if (this.rooms.get(key).history.length < 1) {
        // no messages, if old - delete
        if (
          this.rooms.get(key).createdAt.getTime() + 1000 * 60 <
          new Date().getTime()
        ) {
          count++;
          this.rooms.delete(key);
        }
      } else {
        // There are messages, delete ones with newest messages being older than 1 hour
        let isOld = this.rooms
          .get(key)
          .history.some(
            message =>
              message.timestamp.getTime() + 1000 * 60 * 60 <
              new Date().getTime()
          );
        if (isOld) this.rooms.delete(key);
        count++;
      }
    }
    console.log(`Deleted ${count} rooms for inactivity`);
  }
}

module.exports = new RoomManager();
