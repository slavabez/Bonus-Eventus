import * as uniqid from "uniqid";
import * as socketIO from "socket.io";

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

  registerNewUser(props: UserProps): boolean | User {
    // Make sure no user with such ID is already registered
    if (!props.id) {
      return false;
    }
    if (this.allUsers.has(props.id)) {
      return false;
    }
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

  handleNewUserRegisttration(socket: socketIO.Socket) {
    return (data: any) => {
      // Add socket ID to the data before creating a user
      data.socketId = socket.id;
    };
  }
}
