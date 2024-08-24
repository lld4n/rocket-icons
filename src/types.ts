export enum FileNameType {
  FULL = "FULL",
  INCLUDES = "INCLUDES",
  REGEX = "REGEX",
}

export enum IconType {
  FOLDER = "folders",
  FILE = "files",
  EXT = "ext",
  COMMON = "common",
}

interface FileNameBase {
  type: FileNameType;
}

interface FileNameFull extends FileNameBase {
  type: FileNameType.FULL;
  filename: string;
}

interface FileNameIncludes extends FileNameBase {
  type: FileNameType.INCLUDES;
  filename: string;
}

interface FileNameRegex extends FileNameBase {
  type: FileNameType.REGEX;
  filename: RegExp;
}

type FileName = FileNameFull | FileNameIncludes | FileNameRegex;

export interface IconBase {
  icon: string;
  filenames: FileName[];
}

export type Icon = IconBase & { type: IconType };

export enum MapType {
  FOLDERS_FULL = "FOLDERS_FULL",
  FOLDERS_INCLUDES = "FOLDERS_INCLUDES",
  FOLDERS_REGEX = "FOLDERS_REGEX",
  FILES_FULL = "FILES_FULL",
  FILES_INCLUDES = "FILES_INCLUDES",
  FILES_REGEX = "FILES_REGEX",
}

interface MapItem {
  val: string;
  filename: string;
}

export type Map = {
  [key in MapType]: MapItem[];
};
