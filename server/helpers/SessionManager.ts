import * as crypto from "crypto";

const sessionKey: string = process.env.SESSION_KEY || "some_key";

export default class SessionManager {
  static public encryptKey(socketId: string): string {
    const key = crypto.
  }
}
