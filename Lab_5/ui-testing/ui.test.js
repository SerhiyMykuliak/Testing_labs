import puppeteer from "puppeteer";


describe('Basic puppeteer test', () =>{
  const PAGE_URL = 'https://www.cyberpunk.net/us/en';
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();

    await page.setViewport({
      width: 1300,  
      height: 800  
    });
    await page.goto(PAGE_URL);

    await page.click('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
  });

  afterAll(async () =>{
    browser.close();
  });

  test('Should display the correct title', async () => {
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', el => el.innerText);
    expect(title).toBe('GET THE ULTIMATE CYBERPUNK 2077 EXPERIENCE');
  });

  test('Verify presence of menu', async () => {
    const menuList = await page.$('.menu-list');
    expect(menuList).not.toBeNull();
  });

  test('Verify presence of menu items', async () => {
    const menuItems = await page.$$('.menu-item');
    expect(menuItems).not.toBeNull();
  });
  
  test('Verify presence of buy now button in menu', async () => {
    const buyNowBtn = await page.$('.menu-list .menu-item a[href*="buy"]');
    expect(buyNowBtn).not.toBeNull();
  });

  test('Verify presence of buy now button text', async () => {
    const buyNowBtnText = await page.$eval('.menu-list .menu-item a[href*="buy"]', el => el.innerText);
    expect(buyNowBtnText).toBe("BUY NOW");
  });

});