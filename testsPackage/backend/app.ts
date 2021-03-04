import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { Config, Configs } from './types';
import { fromDir, base64Encode } from './utils';

const rootPath: string = path.resolve(process.cwd(), '../../');

const getConfig = (): Configs => {
    const configJson = fs.readFileSync(rootPath + '/testsConfig.json');
    const {
        picType,
        baseShots: { folder: baseShotsFolder, fileSuffix: baseShotsSuffix, ignoreSuffix: baseShotsIgnoreSuffix },
        newShots: { folder: newShotsFolder, fileSuffix: newShotsSuffix, ignoreSuffix: newShotsIgnoreSuffix },
        // @ts-ignore
    }: Config = JSON.parse(configJson);
    return {
        picType,
        base: {
            path: path.resolve(rootPath, baseShotsFolder),
            filter: baseShotsSuffix,
            ignoreSuffix: baseShotsIgnoreSuffix
        },
        newShots: {
            path: path.resolve(rootPath, newShotsFolder),
            filter: newShotsSuffix,
            ignoreSuffix: newShotsIgnoreSuffix
        },
    };
};

const app = express();

const getPics = (type: 'base' | 'newShots'): string[] | null => {
    const {
        [type]: { path, filter, ignoreSuffix },
        picType,
    } = getConfig();
    return fromDir(path, `${filter}.${picType}`, ignoreSuffix, type);
};

const extractFileName = (file: string, filter: string, picType: string, path: string): string => {
    const splittedFile = file.split(path + '/');
    const formattedFile = splittedFile[splittedFile.length - 1];

    return formattedFile.substring(
        0,
        formattedFile.lastIndexOf(`${filter}.${picType}`),
    );
};



const getDiffs = () => {
    const {
        base: { filter: baseFilter, path: basePath },
        newShots: { filter: newShotsFilter, path: newShotsPath },
        picType,
    } = getConfig();
    const basePics = getPics('base');
    const newShotsPics = getPics('newShots');
    if (!basePics || !newShotsPics) return [];
    const pairs = [];
    for (let basePic of basePics) {
        for (let newShotsPic of newShotsPics) {
            const baseFileName = extractFileName(basePic, baseFilter, picType, basePath);
            // console.log("baseFileName", baseFileName);
            // console.log("neFilesName", extractFileName(newShotsPic, newShotsFilter, picType, newShotsPath));

            if (
                baseFileName === extractFileName(newShotsPic, newShotsFilter, picType, newShotsPath) &&
                basePic !== newShotsPic
            ) {
                pairs.push({ basePic, newShotsPic, basePicFile: base64Encode(basePic), newShotsPicFile: base64Encode(newShotsPic), baseFileName });
            }
        }
    }
    return pairs;
};
console.log(getDiffs());

app.use(express.json());

app.get('/', (req: Request, res: Response) => res.send('hello'));

app.get('/newShotss', (req: Request, res: Response) => {
    res.json(getDiffs())
})

app.use(express.static('../client/build'));
app.use(express.json());

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

export default app;
