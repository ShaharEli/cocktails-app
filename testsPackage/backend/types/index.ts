import {type} from 'os';

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

export interface Pics {
  picType: string;
  pics: string[] | null;
  pathToBrunch: string | null;
}

export type Brunch = string | null;

export type FirstIndicator = 'base' | 'newShots' | null;
