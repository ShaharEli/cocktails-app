
interface FolderConfig {
    folder: string,
    fileSuffix: string
}

interface PathConfig {
    path: string,
    filter: string
}

export interface Config {
    baseShots: FolderConfig,
    diffShots: FolderConfig
}

export interface Configs {
    picType: string,
    base: PathConfig,
    diff: PathConfig
}