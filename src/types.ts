export enum IconType {
  FOLDERS = "folders",
  COMMON = "common",
  FILES = "files",
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
