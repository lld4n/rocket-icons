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

// types

interface Badge {
  text: string;
  url: string;
  color: string;
}

// constants

const map: { [type in IconType]: Icon[] } = {
  [IconType.FOLDERS]: folders,
  [IconType.RECTANGLE]: folders,
  [IconType.COMMON]: common,
  [IconType.FILES]: files,
  [IconType.EXT]: ext,
};
const BADGE_START = "<!--BADGE--->";
const BADGE_END = "<!--BADGE_END--->";
const PACKAGE_JSON = JSON.parse(fs.readFileSync("./package.json").toString());
const args = process.argv;
const version = PACKAGE_JSON.version;
const oldVersion = fs.readFileSync("./version").toString();
const badges: Badge[] = [
  {
    text: "Figma",
    url: "https://www.figma.com/design/WF5eDX3KsJMzmVXTjWxv72/Rocket-Icons?node-id=0-1&t=ujglndRAjCvTZIG9-1",
    color: "FF3E00",
  },
  {
    text: "JetBrains Plugin",
    url: "https://github.com/lld4n/rocket-icons-jetbrains",
    color: "0366D6",
  },
  {
    text: "Author",
    url: "https://github.com/lld4n",
    color: "000000",
  },
  {
    text: "LICENSE MIT",
    url: "https://github.com/lld4n/rocket-icons/tree/master/LICENSE",
    color: "000000",
  },
  {
    text: version,
    url: "https://github.com/lld4n/rocket-icons/releases",
    color: "000000",
  },
];

// arguments from cli

let message = "";
let no_deploy = false;
let no_version = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "-m") {
    if (args[i + 1]) {
      message = ": " + args[i + 1];
    }
  } else if (args[i] === "-no-deploy") {
    no_deploy = true;
  } else if (args[i] === "-no-version") {
    no_version = true;
  }
}

// version

if (!no_version) {
  if (oldVersion === version) {
    throw new Error("Неправильные версии");
  }

  fs.writeFileSync("./version", version);
}

// docs

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

// readme

const readme = fs.readFileSync("./README.md").toString();
const readmeBuffer = readme.split("\n");

let md = "";
let work = false;
for (const line of readmeBuffer) {
  if (line === BADGE_START) {
    work = true;
    md += BADGE_START + "\n";
    for (const b of badges) {
      md += `[![](https://img.shields.io/badge/${b.text.replace(" ", "%20")}-${b.color})](${b.url})\n`;
    }
  }
  if (line === BADGE_END) work = false;

  if (!work) {
    md += line + "\n";
  }
}

fs.writeFileSync("./README.md", md);

// push

if (!no_deploy) {
  const commitMessage = version + message;
  spawnSync("git", ["add", "."], { stdio: "inherit" });
  spawnSync("git", ["commit", "-m", commitMessage], { stdio: "inherit" });
  spawnSync("git", ["push"], { stdio: "inherit" });
}
