import * as fs from "node:fs";

const files = fs.readdirSync("./icons", { recursive: true });

for (const file of files) {
  if (file.includes(".svg") && typeof file === "string") {
    try {
      fs.renameSync(
        "./icons/" + file,
        "./icons/" + file.replace("variant=", ""),
      );
    } catch (e) {}
  }
}
