import nativePixelMatch from 'native-pixelmatch';

export const screenshotConfig = new nativePixelMatch(
  'temp',
  'shots',
  'screenshot_testing',
  'detox',
);
