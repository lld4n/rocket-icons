export enum IconType {
  FOLDER = "folders",
  COMMON = "common",
  FILE = "files",
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
