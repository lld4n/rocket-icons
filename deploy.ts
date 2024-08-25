import * as fs from "node:fs";
import { spawnSync } from "node:child_process";
import { folders, IconVariant } from "./src";

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

for (const key in IconVariant) {
  const VARIANT = key.toUpperCase();
  let md = `# ${VARIANT}\n`;

  md += `## FOLDERS\n`;
  for (const icon of folders) {
    md += `- ${icon.icon} ![${icon.icon}](../icons/${key.toLowerCase()}/folders/${icon.icon}.svg)\n`;
    for (const filename of icon.filenames) {
      md += `  - \`${filename}\`\n`;
    }
  }

  fs.writeFileSync(`./docs/${VARIANT}.md`, md);
}

const commitMessage = version + message;
spawnSync("git", ["add", "."], { stdio: "inherit" });
spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" });
spawnSync("git", ["push"], { stdio: "inherit" });
