import * as fs from "node:fs";
import { spawnSync } from "node:child_process";

const PACKAGE_JSON = JSON.parse(fs.readFileSync("./package.json").toString());

const args = process.argv;
const version = PACKAGE_JSON.version;

let message = "";

for (let i = 0; i < args.length; i++) {
  if (args[i] === "-m") {
    if (args[i + 1]) {
      message = ": " + args[i + 1];
    }
  }
}

const commitMessage = version + message;

spawnSync("git", ["add", "."], { stdio: "inherit" });
spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" });
spawnSync("git", ["push"], { stdio: "inherit" });
