import * as fs from "node:fs";
import { spawnSync } from "node:child_process";
import { files, folders, IconVariant } from "./src";

const PACKAGE_JSON = JSON.parse(fs.readFileSync("./package.json").toString());

const args = process.argv;
const version = PACKAGE_JSON.version;

let message = "";
let no_deploy = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "-m") {
    if (args[i + 1]) {
      message = ": " + args[i + 1];
    }
  } else if (args[i] === "-no") {
    no_deploy = true;
  }
}

for (const key in IconVariant) {
  const VARIANT = key.toUpperCase();
  let md = `# ${VARIANT}\n`;

  md += `## FOLDERS\n`;
  for (const icon of folders) {
    md += `### ${icon.icon}\n`;
    md += `<img src="../icons/${key.toLowerCase()}/folders/${icon.icon}.svg" width="60" height="60"/>\n\n`;
    for (const filename of icon.filenames) {
      md += `\`${filename}\`\n`;
    }
  }

  md += `## FILES [ONLY TOKENS]\n`;
  for (const icon of files) {
    md += `### ${icon.icon}\n`;
    // md += `<img src="../icons/${key.toLowerCase()}/folders/${icon.icon}.svg" width="60" height="60"/>\n\n`;
    for (const filename of icon.filenames) {
      md += `\`${filename}\`\n`;
    }
  }

  fs.writeFileSync(`./docs/${VARIANT}.md`, md);
}
if (!no_deploy) {
  const commitMessage = version + message;
  spawnSync("git", ["add", "."], { stdio: "inherit" });
  spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" });
  spawnSync("git", ["push"], { stdio: "inherit" });
}
