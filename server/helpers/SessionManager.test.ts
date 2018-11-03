import "jest";
import SessionManager from "./SessionManager";

describe("Encryption and decryption", function () {
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
});
