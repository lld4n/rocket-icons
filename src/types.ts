export enum IconType {
  FOLDERS = "folders",
  RECTANGLE = "rectangle",
  COMMON = "common",
  FILES = "files",
  EXT = "ext",
}

export enum IconVariant {
  DUO = "duo",
  OUTLINE = "outline",
  FILLED = "filled",
  REVERSE = "reverse",
}

export interface Icon {
  icon: string;
  filenames: string[];
}
