import {screenshotConfig} from './helpers';

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await new Promise((resolve, reject) => setTimeout(resolve, 10000));
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('input'))).toBeVisible();
    screenshotConfig.createScreenshot('input', 'homePage');
    screenshotConfig.pixelDiff('input', 'homePage');
  });

  it('should home title hello screen after tap', async () => {
    await expect(element(by.id('title'))).toBeVisible();
    await expect(element(by.id('title'))).toHaveText(
      'While you are thinking what cocktail you want heres random cocktail',
    );
    screenshotConfig.createScreenshot('title', 'homePage');
    screenshotConfig.pixelDiff('title', 'homePage');
  });
});
