import * as fs from "node:fs";

const args = process.argv;
const files = fs.readdirSync("./icons", { recursive: true });

let clear = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "-clear") {
    clear = true;
  }
}

if (clear) {
  clearing();
} else {
  rename();
}

function clearing() {
  for (const file of files) {
    if (file.includes(".svg") && typeof file === "string") {
      fs.rmSync("./icons/" + file);
    }
  }
}

function rename() {
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
}
