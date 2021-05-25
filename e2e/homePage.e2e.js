/* eslint-env detox/detox, mocha */

import {
  testScreenshot,
  api,
  HOME_SCREEN_FOLDER,
  SLOW_DELAY,
  RANDOM_COCKTAIL_BTN,
  waitForElm,
} from './helpers';
import {
  randomCocktailMockData1,
  randomCocktailMockData2,
  RANDOM_COCKTAIL_URL_SUFFIX,
} from './mocks';

jest.setTimeout(440000);
let randomCocktailMockApi;
describe('Home page tests', () => {
  beforeAll(async () => {
    randomCocktailMockApi = await api
      .nock(RANDOM_COCKTAIL_URL_SUFFIX)
      .method('get')
      .status(200)
      .send(randomCocktailMockData1);
    await device.reloadReactNative();
    await api.finishTest();
  });

  it('Home page should be pixel perfect', async () => {
    await waitForElm(RANDOM_COCKTAIL_BTN);
    await expect(element(by.id(RANDOM_COCKTAIL_BTN))).toBeVisible();
    await testScreenshot('mainPage', HOME_SCREEN_FOLDER, SLOW_DELAY);
  });

  it('Random cocktail button should change current cocktail', async () => {
    // await randomCocktailMockApi?.deleteRoute();
    randomCocktailMockApi = await api
      .nock(RANDOM_COCKTAIL_URL_SUFFIX)
      .method('get')
      .status(200)
      .send(randomCocktailMockData2);
    await element(by.id(RANDOM_COCKTAIL_BTN)).tap();
    await testScreenshot('mainPage2', HOME_SCREEN_FOLDER, SLOW_DELAY);
  });
});
