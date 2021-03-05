import {execSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import pixelMatch from 'pixelmatch';
import {PNG} from 'pngjs';
import {File, FirstIndicator} from '../types';
import unzipper from 'unzipper';

const tempDiffFolder = 'tempDiffFolder';
const tempDiffFileName = 'tempDiff.png';
const tempBrunchShotsFolder = 'tempBrunchShotsFolder';
const brunchZipName = 'brunchZip';

export const rootPath: string = path.resolve(process.cwd(), '../../');
const pathTopZip = `${rootPath}/${brunchZipName}.zip`;

const pathToTempDiffFolder = path.resolve(__dirname, '../', tempDiffFolder);
const pathToTempBrunchShotsFolder = path.resolve(
  __dirname,
  '../',
  tempBrunchShotsFolder,
);

const pathToTempDiffFile = path.resolve(pathToTempDiffFolder, tempDiffFileName);

const baseArr: string[] = [];
const newShotsArr: string[] = [];

let current = 'base';

export const base64Encode = (file: string, picType: string) => {
  let bitmap = fs.readFileSync(file);
  return (
    `data:image/${picType};base64,` + Buffer.from(bitmap).toString('base64')
  ); //TODO
};

export const fromDir = (
  startPath: string,
  filter: string,
  ignoreSuffix: string,
  first: FirstIndicator = null,
): string[] | null => {
  if (first) {
    current = first;
    if (first === 'base') {
      baseArr.length = 0;
    } else {
      newShotsArr.length = 0;
    }
  }
  const currentArr = current === 'base' ? baseArr : newShotsArr;
  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return null;
  }
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, ignoreSuffix);
    } else if (filename.endsWith(filter) && !filename.endsWith(ignoreSuffix)) {
      currentArr.push(filename);
    }
  }
  return currentArr;
};

export const sampleConfig = {
  picType: 'png',
  theme: 'light',
  baseShots: {
    folder: 'screenshot_testing/shots',
    fileSuffix: '',
    ignoreSuffix: 'full',
  },
  newShots: {
    folder: 'screenshot_testing/temp',
    fileSuffix: '',
    ignoreSuffix: 'full',
  },
};

export const createDiffs = (
  baseImgPath: string,
  newImgPath: string,
  picType: string,
): File | null => {
  const tmpImage = PNG.sync.read(fs.readFileSync(baseImgPath));
  const saveImage = PNG.sync.read(fs.readFileSync(newImgPath));
  const {width, height} = saveImage;
  const diff = new PNG({width, height});
  const diffCount = pixelMatch(
    saveImage.data,
    tmpImage.data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1,
    },
  );

  console.log('diffCount:', diffCount);
  if (diffCount > 0) {
    if (!fs.existsSync(pathToTempDiffFolder)) {
      fs.mkdirSync(pathToTempDiffFolder);
    }
    fs.writeFileSync(pathToTempDiffFile, PNG.sync.write(diff));
    const base64 = base64Encode(pathToTempDiffFile, picType);
    fs.unlinkSync(pathToTempDiffFile);
    return {data: base64, width, height};
  } else {
    return null;
  }
};

export const getBrunchBaseline = (brunchName: string, folder: string) => {
  // const basePath =
  //   execSync('git config --get remote.origin.url').toString().slice(0, -4) +
  //   '/tree/' +
  //   name;

  // if (fs.existsSync(pathToTempBrunchShotsFolder)) {
  //   fs.rmdirSync(pathToTempBrunchShotsFolder, {recursive: true});
  //   fs.mkdirSync(pathToTempBrunchShotsFolder);
  // }
  const path = `${pathToTempBrunchShotsFolder}/${folder}`;
  console.log(path);

  execSync(
    `cd ${rootPath} && git archive --output=${brunchZipName}.zip origin/${brunchName}:${folder}`,
  );
  fs.createReadStream(pathTopZip).pipe(unzipper.Extract({path}));
  fs.unlinkSync(pathTopZip);

  return path;
  // git archive --output=archive-dev.zip  origin/screenshot-testing:screenshot_testing
};
