import * as crypto from "crypto";

export default class SessionManager {
  public static genSalt(salt?: string): Buffer {
    const hashedSalt = crypto.createHash("sha1");
    if (salt) {
      hashedSalt.update(salt);
    } else if (process.env.SESSION_KEY) {
      hashedSalt.update(process.env.SESSION_KEY);
    } else {
      // No salt set, use nothing
      hashedSalt.update("");
    }

    return hashedSalt.digest().slice(0, 16);
  }

  public static encrypt(secret: string, salt?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        // Create a random initia
        let iv = crypto.randomBytes(16);
        const hashedSalt = SessionManager.genSalt(salt);
        const key = crypto.createCipheriv("aes-128-cbc", hashedSalt, iv);
        let encrypted = key.update(secret);
        encrypted = Buffer.concat([encrypted, key.final()]);

        resolve(`${iv.toString("hex")}:${encrypted.toString("hex")}`);
      } catch (e) {
        reject(e);
      }
    });
  }

  public static decrypt(secret: string, salt?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const textParts = secret.split(":");
        if (textParts === undefined) {
          reject("Error: secret not properly formatted");
        }
        const iv = Buffer.from(textParts[0], "hex");
        const text = Buffer.from(textParts[1], "hex");
        const hashedSalt = SessionManager.genSalt(salt);
        const decipher = crypto.createDecipheriv("aes-128-cbc", hashedSalt, iv);
        let decrypted = decipher.update(text);

        decrypted = Buffer.concat([decrypted, decipher.final()]);

        resolve(decrypted.toString());
      } catch (e) {
        reject("Error decrypting, hash is likely corrupted");
      }
    });
  }
}
