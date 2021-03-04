import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { Config, Configs } from './types';
import { fromDir } from './utils';

const rootPath: string = path.resolve(process.cwd(), '../../');

const getConfig = (): Configs => {
    const configJson = fs.readFileSync(rootPath + '/testsConfig.json');
    const {
        picType,
        baseShots: { folder: baseShotsFolder, fileSuffix: baseShotsSuffix },
        diffShots: { folder: diffShotsFolder, fileSuffix: diffShotsSuffix },
        // @ts-ignore
    }: Config = JSON.parse(configJson);
    return {
        picType,
        base: {
            path: path.resolve(rootPath, baseShotsFolder),
            filter: baseShotsSuffix,
        },
        diff: {
            path: path.resolve(rootPath, diffShotsFolder),
            filter: diffShotsSuffix,
        },
    };
};

const app = express();

const getPics = (type: 'base' | 'diff') => {
    const {
        [type]: { path, filter },
        picType,
    } = getConfig();
    return fromDir(path, `${filter}.${picType}`, type);
};

const extractFileName = (file: string, filter: string, picType: string) => {
    const splittedFile = file.split('/');
    const formattedFile = splittedFile[splittedFile.length - 1];
    return formattedFile.substring(
        0,
        formattedFile.lastIndexOf(`${filter}.${picType}`),
    );
};

const getDiffs = () => {
    const {
        base: { filter: baseFilter },
        diff: { filter: diffFilter },
        picType,
    } = getConfig();
    const basePics = getPics('base');
    const diffPics = getPics('diff');
    if (!basePics || !diffPics) return [];
    const pairs = [];
    for (let basePic of basePics) {
        for (let diffPic of diffPics) {
            const baseFileName = extractFileName(basePic, baseFilter, picType);
            if (
                baseFileName === extractFileName(diffPic, diffFilter, picType) &&
                basePic !== diffPic
            ) {
                pairs.push([basePic, diffPic, baseFileName]);
            }
        }
    }
    return pairs;
};

app.use(express.json());

app.get('/', (req, res) => res.send('hello'));

app.use(express.static('../client/build'));
app.use(express.json());

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

export default app;
