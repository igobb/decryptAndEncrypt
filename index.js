/* eslint-disable import/extensions */
import { decryptText, encryptText } from "./cipher.js";

(async () => {
  const strongPassword = "zaq1@WSX";

  const salt = "XXXXXXXXXXXX";

  const encryptedFromCipher = await encryptText(
    "Mocny tekst",
    strongPassword,
    salt,
  );

  const { encrypted: encryptedString, iv: ivHexFromCipher } =
    encryptedFromCipher;

  console.log("encryptedFromCipher: ", encryptedFromCipher);

  const decryptedFromCipher = await decryptText(
    encryptedString,
    strongPassword,
    salt,
    ivHexFromCipher,
  );

  console.log("decryptedFromCipher: ", decryptedFromCipher);
})();
