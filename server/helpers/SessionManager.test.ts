import "jest";
import SessionManager from "./SessionManager";

describe("Encryption and decryption", function() {
  let secretCode = "I'm a secret string";
  let encryptedCode: string;

  test("encrypt() works", async () => {
    const encrypted = await SessionManager.encrypt(secretCode);
    encryptedCode = encrypted;
    expect(encrypted).not.toBe(secretCode);
  });

  test("decrypt() works", async () => {
    const decrypted = await SessionManager.decrypt(encryptedCode);
    expect(secretCode).toBe(decrypted);
  });

  test("encrypt then decrypt works with custom salt", async () => {
    const salt = "I'm a custom salt";
    const secret = "Totally secret secret";
    const secretEncrypted = await SessionManager.encrypt(secret, salt);
    const secretDecrypted = await SessionManager.decrypt(secretEncrypted, salt);

    expect(secretDecrypted).toBe(secret);
  });

  test("encrypt produces different hashes with same salt", async () => {
    const salt = "so_so_salty";
    const secret = "hack_me_lol";
    const encryptedRunOne = await SessionManager.encrypt(secret, salt);
    const encryptedRunTwo = await SessionManager.encrypt(secret, salt);

    expect(encryptedRunOne).not.toBe(encryptedRunTwo);
  });

  test("encrypt produces different hashes with different salt", async () => {
    const secret = "hack_me_lol";
    const encryptedRunOne = await SessionManager.encrypt(secret, "salty_salt");
    const encryptedRunTwo = await SessionManager.encrypt(
      secret,
      "salty_pepper"
    );

    expect(encryptedRunOne).not.toBe(encryptedRunTwo);
  });

  test("decrypting with IV from different encryption should throw error", async () => {
    expect.assertions(2);
    const secret = "hack me";
    // Generate two encrypted secrets
    const encrypted = await SessionManager.encrypt(secret, "salty");
    const encrypted2 = await SessionManager.encrypt(secret, "salty");

    // Swap the IV parts
    const parts1 = encrypted.split(":");
    const parts2 = encrypted2.split(":");

    const joined1 = [parts2[0], parts1[1]].join(":");
    const joined2 = [parts1[0], parts2[1]].join(":");

    // Expect both promises to reject with specific message
    SessionManager.decrypt(joined1, "salty").catch(e =>
      expect(e).toMatch("Error decrypting, hash is likely corrupted")
    );
    SessionManager.decrypt(joined2, "salty").catch(e =>
      expect(e).toMatch("Error decrypting, hash is likely corrupted")
    );

  });

});
