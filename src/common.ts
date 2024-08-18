import { Icon, IconBase, IconType } from "../types";

const base: IconBase[] = [{ icon: "folder", filenames: [] }];

export const common: Icon[] = base.map((item) => ({
  ...item,
  type: IconType.COMMON,
}));
