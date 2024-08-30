import * as fs from "node:fs";
import { spawnSync } from "node:child_process";
import {
  common,
  ext,
  files,
  folders,
  Icon,
  IconType,
  IconVariant,
} from "./src";

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

const map: { [type in IconType]: Icon[] } = {
  [IconType.FOLDERS]: folders,
  [IconType.COMMON]: common,
  [IconType.FILES]: files,
  [IconType.EXT]: ext,
};

for (const variant in IconVariant) {
  const VARIANT = variant.toUpperCase();
  for (const type in IconType) {
    const TYPE = type.toUpperCase();
    let md = `# ${VARIANT} - ${TYPE}\n`;
    md +=
      variant.toLowerCase() === IconVariant.OUTLINE
        ? "> only dark theme in IDE\n"
        : "";
    const items: Icon[] = map[type.toLowerCase() as IconType];

    for (const icon of items) {
      md += `### ${icon.icon}\n`;
      md += `<img src="../../icons/${variant.toLowerCase()}/${type.toLowerCase()}/${icon.icon}.svg" width="60" height="60"/>\n\n`;
      for (const filename of icon.filenames) {
        md += `\`${filename}\`\n`;
      }
    }

    fs.writeFileSync(`./docs/${VARIANT}/${TYPE}.md`, md);
  }
}

if (!no_deploy) {
  const commitMessage = version + message;
  spawnSync("git", ["add", "."], { stdio: "inherit" });
  spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" });
  spawnSync("git", ["push"], { stdio: "inherit" });
}
