export enum IconType {
  FOLDER = "folders",
  COMMON = "common",
  FILE = "files",
  EXT = "ext",
}

export enum IconVariant {
  DUO = "duo",
  OUTLINE = "outline",
  FILLED = "filled",
}

export interface Icon {
  icon: string;
  filenames: string[];
}
