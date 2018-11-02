export interface UserProps {
  avatar: string;
  name: string;
  color: string;
  id: string;
  socketId?: string;
}

export class User {
  public avatar: string;
  public name: string;
  public color: string;
  public id: string;
  public socketId?: string;

  constructor(props: UserProps) {
    // Wanted to use Object.assign, but typescript doesn't like it
    this.id = props.id;
    this.name = props.name;
    this.avatar = props.avatar;
    this.color = props.color;
    this.socketId = props.socketId;
  }
}

export default class UserManager {
  public allUsers?: Map<string, User>;

  constructor(){
    this.allUsers = new Map();
  }

  registerNewUser(props: UserProps){
    // Make sure no user with such ID is already registered
    if (!this.allUsers.has(props.id)) {
      return;
    }
  }

}
