import { scrypt, randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { promisify } from "util";

export const encryptText = async (text, password, salt) => {
  const algorithm = "aes-192-cbc";

  const key = await promisify(scrypt)(password, salt, 24);
  const iv = randomBytes(16);
  const cipher = createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return {
    encrypted,
    iv: iv.toString("hex"),
  };
};

export const decryptText = async (text, password, salt, ivHex) => {
  const algorithm = "aes-192-cbc";

  const key = await promisify(scrypt)(password, salt, 24);
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(text, "hex", "utf-8");
  decrypted += decipher.final("utf-8");

  return decrypted;
};
