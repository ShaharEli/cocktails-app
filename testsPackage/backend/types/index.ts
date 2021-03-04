interface FolderConfig {
  folder: string;
  fileSuffix: string;
  ignoreSuffix: string;
}

export interface File {
  width: number;
  height: number;
  data: string;
}
interface PathConfig {
  path: string;
  filter: string;
  ignoreSuffix: string;
}

export interface Config {
  picType: string;
  baseShots: FolderConfig;
  newShots: FolderConfig;
}

export interface Configs {
  picType: string;
  base: PathConfig;
  newShots: PathConfig;
}
