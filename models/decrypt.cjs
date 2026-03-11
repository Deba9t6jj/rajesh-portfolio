const crypto = require("crypto");
const fs = require("fs");

try {
  const password = "MyCharacter12";
  const key = crypto.createHash("sha256").update(password).digest();

  const fileBuffer = fs.readFileSync("character.enc");
  const iv = fileBuffer.slice(0, 16);
  const encrypted = fileBuffer.slice(16);

  console.log("iv length:", iv.length);
  console.log("encrypted size:", encrypted.length);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted);
  let final = decipher.final();

  fs.writeFileSync("character.glb", Buffer.concat([decrypted, final]));
  console.log("Decryption successful.");
} catch (e) {
  console.error("Error decrypting:", e);
}
