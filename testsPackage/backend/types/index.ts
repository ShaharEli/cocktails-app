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
  theme: string;
  picType: string;
  baseShots: FolderConfig;
  newShots: FolderConfig;
}

export interface Configs {
  theme: string;
  picType: string;
  base: PathConfig;
  newShots: PathConfig;
}
