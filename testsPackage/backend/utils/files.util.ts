import fs from 'fs';
import path from 'path';
import pixelMatch from 'pixelmatch';
import {PNG} from 'pngjs';
import {File} from '../types';
const tempDiffFolder = 'tempDiffFolder';
const tempDiffFileName = 'tempDiff.png';
const pathToTempDiffFolder = path.resolve(__dirname, '../', tempDiffFolder);
const pathToTempDiffFile = path.resolve(pathToTempDiffFolder, tempDiffFileName);
const baseArr: string[] = [];
const newShotsArr: string[] = [];
let current = 'base';
type FirstIndicator = 'base' | 'newShots' | null;

export const base64Encode = (file: string) => {
  let bitmap = fs.readFileSync(file);
  return 'data:image/png;base64,' + Buffer.from(bitmap).toString('base64'); //TODO
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
  baseShots: {
    folder: 'screenshot_testing/shots',
    fileSuffix: '',
    ignoreSuffix: 'full',
  },
  newShots: {
    folder: 'screenshot_testing/temp',
    fileSuffix: '-diff',
    ignoreSuffix: 'full',
  },
};

export const createDiffs = (
  baseImgPath: string,
  newImgPath: string,
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
    const base64 = base64Encode(pathToTempDiffFile);
    fs.unlinkSync(pathToTempDiffFile);
    return {data: base64, width, height};
  } else {
    return null;
  }
};
