import path from 'path';
import fs from 'fs';
import {sampleConfig} from '../utils';
const rootPath: string = path.resolve(process.cwd(), '../../../');

const configFileName = 'testsConfig';
const shotsBaseFolderName = 'screenshot_testing`';
const baseShotsFolderName = 'shots';
const newShotsFolderName = 'temp';

const pathToConfig = `${rootPath}/${configFileName}.json`;

const pathToShotsBaseFolder = `${rootPath}/${shotsBaseFolderName}`;
const pathToBaseShotsFolder = `${pathToShotsBaseFolder}/${baseShotsFolderName}`;
const pathToNewShotsFolder = `${pathToShotsBaseFolder}/${newShotsFolderName}`;

const checkAndMakeDir = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    const splittedFolder = folderPath.split('/');
    console.log(splittedFolder[splittedFolder.length - 1], ' created');
  }
};
const foldersPaths = [
  pathToShotsBaseFolder,
  pathToBaseShotsFolder,
  pathToNewShotsFolder,
];

const createTree = (): void => {
  if (!fs.existsSync(pathToConfig)) {
    fs.writeFileSync(pathToConfig, JSON.stringify(sampleConfig));
  }
  foldersPaths.forEach((dir) => {
    checkAndMakeDir(dir);
  });
};

createTree();
