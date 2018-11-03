import { User } from "./UserManager";

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
}
