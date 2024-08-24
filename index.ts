import { common, folders, IconType, Map, MapType } from "./src";

export const rocketIcons = [...folders, ...common];

export const map = (): Map => {
  const res: Map = {
    [MapType.FOLDERS_FULL]: [],
    [MapType.FOLDERS_INCLUDES]: [],
    [MapType.FOLDERS_REGEX]: [],
    [MapType.FILES_FULL]: [],
    [MapType.FILES_INCLUDES]: [],
    [MapType.FILES_REGEX]: [],
  };

  for (const item of rocketIcons) {
    for (const filename of item.filenames) {
      if (item.type === IconType.FOLDER) {
        res[(item.type + "_" + filename.type).toUpperCase()].push({
          val: item.type + "_" + item.icon,
          filename: filename.toString(),
        });
      }
    }
  }

  return res;
};
