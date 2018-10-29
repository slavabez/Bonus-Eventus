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
    // If room exists, add user by ID
    if (this.rooms.has(roomName))
      this.rooms.get(roomName).users.set(user.id, user);
  }

  postRollMessage(rollMessage, roomName) {
    const room = this.rooms.get(roomName);
    // If array has 20 elements or more - delete older to keep 19 newest
    if (room.history.length > 19) {
      room.history = room.history.slice(room.history.length - 19);
    }
    room.history.push(rollMessage);
    /*console.log(
      `Roll result added to room ${roomName}, has ${
        room.history.length
      } items in it`
    );*/
  }

  getUsersInRoom(name) {
    if (this.rooms.has(name))
      // Room exists, return users as array
      return Array.from(this.rooms.get(name).users.values());
  }

  removeUserFromRoom(id, roomName) {
    if (this.rooms.has(roomName)) {
      const room = this.rooms.get(roomName);
      if (room.users.has(id)) {
        this.rooms.get(roomName).users.delete(id);
      }
    }
  }

  removeFromAllRooms(id) {
    // Cycle through all rooms, remove this user from all
    this.rooms.forEach(r => {
      r.users.forEach(u => {
        if (u.id === id) {
          r.users.delete(id);
          // console.log(`Removed user ${id} from room ${r.name}`);
        }
      });
    });
  }

  updateRooms(io) {
    // Go through all rooms, emit connected client list to each group
    this.rooms.forEach(r => {
      const users = Array.from(r.users.values());
      // console.log("users in each room", users);
      if (users.length > 0) io.in(r.name).emit("room.players", users);
      /*console.log(
          `--- Room ${r.name} has ${
            users.length
          } connected clients, emitting to that room ---`
        );*/
    });
  }

  emitRoomInfoToClients(io) {
    io.emit("room.allRooms", this.getRooms());
  }

  deleteOldRooms(io) {
    try {
      let hasDeleted = false;
      for (const key of this.rooms.keys()) {
        // First, check if there are any messages
        if (this.rooms.get(key).history.length < 1) {
          // no messages, if old - delete
          if (
            this.rooms.get(key).createdAt.getTime() + 1000 * 60 * 60 <
            new Date().getTime()
          ) {
            console.log(
              `Deleting room "${
                this.rooms.get(key).name
              }" because there were no messages and it's more than an hour old...`
            );
            this.rooms.delete(key);
            hasDeleted = true;
          }
        } else {
          // There are messages, delete ones with newest messages being older than 1 hour
          let isOld = this.rooms
            .get(key)
            .history.some(
              message =>
                message.createdAt.getTime() + 1000 * 60 * 60 <
                new Date().getTime()
            );
          if (isOld) {
            console.log(
              `Deleting room "${
                this.rooms.get(key).name
              }" because newest roll was older than one hour...`
            );
            this.rooms.delete(key);
            hasDeleted = true;
          }
        }
      }
      if (hasDeleted) this.emitRoomInfoToClients(io);
    } catch (e) {
      console.error("Failed to cleanup old rooms", e);
    }
  }
}

module.exports = new RoomManager();
