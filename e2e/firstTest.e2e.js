describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('input'))).toBeVisible();
  });

  it('should home title hello screen after tap', async () => {
    await expect(element(by.id('title'))).toBeVisible();
    await expect(element(by.id('title'))).toHaveText(
      'While you are thinking what cocktail you want heres random cocktail',
    );
  });
});
