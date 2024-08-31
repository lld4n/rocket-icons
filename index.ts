import { common, ext, files, folders } from "./src";

export * from "./src";

export const rocket = [...folders, ...ext, ...common, ...files];
