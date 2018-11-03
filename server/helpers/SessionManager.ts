import * as crypto from "crypto";

const sessionKey: string = process.env.SESSION_KEY || "some hash";

export default class SessionManager {
  public static genSalt(salt: string | undefined): Buffer {
    const hashedSalt = crypto.createHash("sha1");
    if (salt) {
      hashedSalt.update(salt);
    } else if (process.env.SESSION_KEY) {
      hashedSalt.update(sessionKey);
    } else {
      // No salt set, use nothing
      hashedSalt.update("");
    }

    return hashedSalt.digest().slice(0, 16);
  }

  public static encrypt(socketId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        let iv = crypto.randomBytes(16);
        const salt = SessionManager.genSalt(sessionKey);
        const key = crypto.createCipheriv("aes-128-cbc", salt, iv);
        let encrypted = key.update(socketId);
        encrypted = Buffer.concat([encrypted, key.final()]);

        resolve(`${iv.toString("hex")}:${encrypted.toString("hex")}`);
      } catch (e) {
        reject(e);
      }
    });
  }

  public static decrypt(secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const textParts = secret.split(":");
        if (textParts === undefined) {
          reject("Error: secret not properly formatted");
        }
        const iv = Buffer.from(textParts[0], "hex");
        const text = Buffer.from(textParts[1], "hex");
        const salt = SessionManager.genSalt(sessionKey);
        const decipher = crypto.createDecipheriv("aes-128-cbc", salt, iv);
        let decrypted = decipher.update(text);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        resolve(decrypted.toString());
      } catch (e) {
        reject(e);
      }
    });
  }
}
