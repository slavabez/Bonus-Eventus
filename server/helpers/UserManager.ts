import * as uniqid from "uniqid";
import * as socketIO from "socket.io";
import SessionManager from "./SessionManager";
import RoomManager from "./RoomManager";

export interface UserProps {
  avatar: string;
  name: string;
  color: string;
  id?: string;
  socketId: string;
}

export class User {
  public avatar: string;
  public name: string;
  public color: string;
  public id: string;
  public socketId: string;

  constructor(props: UserProps) {
    // Wanted to use Object.assign, but typescript doesn't like it
    // If overly long values are passed, cut to reasonable size
    if (props.id) {
      this.id = props.id.length > 25 ? props.id.substr(0, 15) : props.id;
    } else {
      this.id = uniqid();
    }
    this.name = props.name.length > 15 ? props.name.substr(0, 15) : props.name;
    this.avatar =
      props.avatar.length > 255 ? props.avatar.substr(0, 255) : props.avatar;
    this.color =
      props.color.length > 7 ? props.color.substr(0, 7) : props.color;
    this.socketId =
      props.socketId.length > 25
        ? props.socketId.substr(0, 15)
        : props.socketId;
  }
}

export default class UserManager {
  public allUsers!: Map<string, User>;

  constructor() {
    this.allUsers = new Map();
  }

  registerNewUser(props: UserProps): null | User {
    // Make sure no user with such ID is already registered
    if (!props.id) {
      // No id passed - generate and ID
      props.id = uniqid();
    }
    if (this.allUsers.has(props.id)) {
      return null;
    }
    // Make sure all fields exist (avatar, color, name)
    if (!props.avatar || !props.color || !props.name) return null;
    const u = new User(props);
    this.allUsers.set(props.id, u);
    return u;
  }

  updateSocketId(userId: string, newId: string) {
    if (this.allUsers.has(userId)) {
      // Neat, a non-null assertion operator (!)
      this.allUsers.get(userId)!.socketId = newId;
    }
  }

  findUserBySocketId(socketId: string): User | undefined {
    // Some neat es6 array methods
    return Array.from(this.allUsers.values()).find(
      u => u.socketId === socketId
    );
  }

  deleteUser(id: string) {
    if (this.allUsers.has(id)) {
      this.allUsers.delete(id);
    }
  }

  handleNewUserRegistration(socket: socketIO.Socket) {
    return async (data: any) => {
      // Add socket ID to the data before creating a user
      data.socketId = socket.id;
      const newUser = this.registerNewUser(data);
      // Ignore if failed to create user
      if (!newUser) {
        socket.emit("register.new.failure");
        return;
      }
      // Encrypt the session, send to user to save as cookie
      const session = await SessionManager.serialiseUser(newUser);
      socket.emit("register.new.success", { session, user: newUser });
    };
  }

  handleRestoreUser(socket: socketIO.Socket) {
    return async (data: any) => {
      // Expect data to be the encrypted cookie
      try {
        const user = await SessionManager.deserialiseUser(data);
        if (this.allUsers.has(user.id)) {
          // If user already in the online list - update socket ID
          this.allUsers.get(user.id)!.socketId = socket.id;
        } else {
          // New - add to list
          this.allUsers.set(user.id, user);
        }
        socket.emit("register.restore.success", user);
      } catch (e) {
        // Failed, prompt user to remove the cookie and create a new character
        socket.emit("register.restore.failure");
      }
    };
  }

  handleClientDisconnect(socket: socketIO.Socket, rm: RoomManager) {
    const um = this;
    return () => {
      // Disconnected, handle
      // If socket has an associated user, remove them from groups
      const user = um.findUserBySocketId(socket.id);
      // No user - do nothing
      if (!user) return;
      // Find the room socket is in
      const room = RoomManager.getSocketRoom(socket);
      // Use wasn't in a room, don't need to do anything
      if (!room) return;
      rm.removeUserFromRoom(user, room);
      socket.to(room).broadcast.emit("room.leave");
    };
  }
}
