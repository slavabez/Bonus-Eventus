import { User } from "./UserManager";
import * as SocketIO from "socket.io";

interface singleRoll {
  order?: number;
  sides?: number;
  result?: number;
}

interface rollAuthor {
  name: string;
  avatar: string;
  color: string;
}

export class RollMessage {
  public author: rollAuthor;
  public rollString: string;
  public total: number;
  public rolls: singleRoll[];
  public createdAt: Date;

  constructor(props: any) {
    this.author = props!.author;
    this.rollString = props!.author;
    this.total = props!.author;
    this.rolls = props!.author;
    this.createdAt = props!.author;
  }
}

export class Room {
  public name: string;
  public users: Map<string, User>;
  public history: RollMessage[];
  public createdAt: Date;

  constructor(name: string) {
    this.name = name;
    this.users = new Map<string, User>();
    this.history = [];
    this.createdAt = new Date();
  }
}

export default class RoomManager {
  public allRooms: Map<string, Room>;

  constructor() {
    this.allRooms = new Map<string, Room>();
  }

  createNewRoom(name: string): null | Room {
    if (this.allRooms.has(name)) return null;
    const room = new Room(name);
    this.allRooms.set(room.name, room);
    return room;
  }

  addUserToRoom(user: User, roomName: string): boolean {
    if (!this.allRooms.has(roomName)) return false;
    // Add to the Users map
    this.allRooms.get(roomName)!.users.set(user.id, user);
    return true;
  }

  removeUserFromRoom(userId: string, roomName: string): boolean {
    if (!this.allRooms.has(roomName)) return false;
    if (!this.allRooms.get(roomName)!.users.has(userId)) return false;
    this.allRooms.get(roomName)!.users.delete(userId);
    return true;
  }

  getUsersInRoom(roomName: string): null | User[] {
    if (!this.allRooms.has(roomName)) return null;
    const room = this.allRooms.get(roomName);
    return Array.from(room!.users.values());
  }

  /**
   * Looks through all rooms and deletes a user if found. Returns true if found and deleted, false if not found in any room
   * @param userId
   */
  removeUserFromAllRooms(userId: string): boolean {
    this.allRooms.forEach(r => {
      r.users.forEach(u => {
        if (u.id === userId) {
          r.users.delete(userId);
          return true;
        }
      });
    });
    return false;
  }

  emitRoomUsersToAll(io: SocketIO.Server): void {
    this.allRooms.forEach(r => {
      // Get users as array, emit to that room
      const users = Array.from(r.users.values());
      if (users.length > 0) io.in(r.name).emit("room.players", users);
    });
  }

  /**
   * Broadcasts a list of all rooms as an array
   * @param io
   */
  broadcastRoomList(io: SocketIO.Server): void {
    io.emit("room.list", Array.from(this.allRooms.values()));
  }

  deleteOldRooms(io: SocketIO.Server): void {
    try {
      const namesToDelete: string[] = [];
      this.allRooms.forEach(r => {
        // First, check if there are any messages in history
        if (r.history.length < 1) {
          if (r.createdAt.getTime() + 1000 * 60 * 60 < new Date().getTime()) {
            // No messages and older than 60 minutes - flag for deletion
            namesToDelete.push(r.name);
          }
        } else {
          // History exists, check time on the last roll, flag to delete if older than 60 minutes
          const lastMessageIsOld = r.history.some(
            message =>
              message.createdAt.getTime() + 1000 * 60 * 60 <
              new Date().getTime()
          );
          if (lastMessageIsOld) namesToDelete.push(r.name);
        }
      });
      console.log(`Flagged ${namesToDelete.length} rooms for deletion.`);
      namesToDelete.forEach(n => {
        if (this.allRooms.has(n)) this.allRooms.delete(n);
      });
    } catch (e) {
      console.error(`Failed to clean up old rooms`, e);
    }
  }
}
