import { FileNameType, Icon, IconBase, IconType } from "../types";

const base: IconBase[] = [
  {
    icon: "angular",
    filenames: [{ type: FileNameType.FULL, filename: ".angular" }],
  },
  {
    icon: "convex",
    filenames: [{ type: FileNameType.FULL, filename: "convex" }],
  },
  {
    icon: "git",
    filenames: [{ type: FileNameType.FULL, filename: ".git" }],
  },
  {
    icon: "github",
    filenames: [{ type: FileNameType.FULL, filename: ".github" }],
  },
  {
    icon: "husky",
    filenames: [{ type: FileNameType.FULL, filename: ".husky" }],
  },
  {
    icon: "node_modules",
    filenames: [{ type: FileNameType.FULL, filename: "node_modules" }],
  },
  {
    icon: "nx",
    filenames: [{ type: FileNameType.FULL, filename: ".nx" }],
  },
  {
    icon: "ts",
    filenames: [
      { type: FileNameType.INCLUDES, filename: "type" },
      { type: FileNameType.INCLUDES, filename: "interface" },
    ],
  },
  {
    icon: "test",
    filenames: [{ type: FileNameType.INCLUDES, filename: "test" }],
  },
];

export const folders: Icon[] = base.map((item) => ({
  ...item,
  type: IconType.FOLDER,
}));
