import * as faker from "faker";
import { User } from "./UserManager";

export default class FakeGenerator {
  static fakeUser(): User {
    return new User({
      socketId: faker.random.uuid(),
      color: "#" + faker.random.number({ min: 100000, max: 999999 }).toString(),
      avatar: faker.internet.url(),
      name: faker.internet.userName()
    });
  }

  /**
   * Generates an array of random Users with 'num' users
   * @param num 5 by default
   */
  static fakeUsers(num: number = 5): User[] {
    return [...Array(num)].map(() => FakeGenerator.fakeUser());
  }
}
