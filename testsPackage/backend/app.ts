import express, {Request, Response} from 'express';
import path from 'path';
import fs from 'fs';
import {Config, Configs} from './types';
import {fromDir, base64Encode, createDiffs} from './utils';

const rootPath: string = path.resolve(process.cwd(), '../../');

const getConfig = (): Configs => {
  const configJson = fs.readFileSync(rootPath + '/testsConfig.json');
  const {
    theme,
    picType,
    baseShots: {
      folder: baseShotsFolder,
      fileSuffix: baseShotsSuffix,
      ignoreSuffix: baseShotsIgnoreSuffix,
    },
    newShots: {
      folder: newShotsFolder,
      fileSuffix: newShotsSuffix,
      ignoreSuffix: newShotsIgnoreSuffix,
    },
  }: // @ts-ignore
  Config = JSON.parse(configJson);
  return {
    theme,
    picType,
    base: {
      path: path.resolve(rootPath, baseShotsFolder),
      filter: baseShotsSuffix,
      ignoreSuffix: baseShotsIgnoreSuffix,
    },
    newShots: {
      path: path.resolve(rootPath, newShotsFolder),
      filter: newShotsSuffix,
      ignoreSuffix: newShotsIgnoreSuffix,
    },
  };
};

const app = express();

interface Pics {
  picType: string;
  pics: string[] | null;
}

const getPics = (type: 'base' | 'newShots'): Pics => {
  const {
    [type]: {path, filter, ignoreSuffix},
    picType,
  } = getConfig();
  return {
    pics: fromDir(path, `${filter}.${picType}`, ignoreSuffix, type),
    picType,
  };
};

const extractFileName = (
  file: string,
  filter: string,
  picType: string,
  path: string,
): string => {
  const splittedFile = file.split(path + '/');
  const formattedFile = splittedFile[splittedFile.length - 1];

  return formattedFile.substring(
    0,
    formattedFile.lastIndexOf(`${filter}.${picType}`),
  );
};

const getDiffs = () => {
  const {
    base: {filter: baseFilter, path: basePath},
    newShots: {filter: newShotsFilter, path: newShotsPath},
    picType,
  } = getConfig();
  const {pics: basePics} = getPics('base');
  const {pics: newShotsPics} = getPics('newShots');
  if (!basePics || !newShotsPics) return [];
  const pairs = [];
  for (let basePic of basePics) {
    for (let newShotsPic of newShotsPics) {
      const baseFileName = extractFileName(
        basePic,
        baseFilter,
        picType,
        basePath,
      );
      if (
        baseFileName ===
          extractFileName(newShotsPic, newShotsFilter, picType, newShotsPath) &&
        basePic !== newShotsPic
      ) {
        pairs.push({
          basePic,
          newShotsPic,
          basePicFile: base64Encode(basePic, picType),
          newShotsPicFile: base64Encode(newShotsPic, picType),
          baseFileName,
          diff: createDiffs(basePic, newShotsPic, picType),
        });
      }
    }
  }
  return pairs;
};

app.use(express.json());

app.get('/diffs', (req: Request, res: Response) => {
  const {theme} = getConfig();
  res.json({pics: getDiffs(), theme});
});

app.post('/approve', async (req: Request, res: Response) => {
  try {
    const {
      body: {basePic, newShotsPic},
    } = req;
    if (!fs.existsSync(basePic) || !fs.existsSync(newShotsPic)) {
      return res.json({success: false});
    }
    fs.unlinkSync(basePic);
    fs.renameSync(newShotsPic, basePic);
    res.json({success: true});
  } catch ({message}) {
    res.json({message});
  }
});
app.use(express.json());

app.use(express.static('../client/build'));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

export default app;
