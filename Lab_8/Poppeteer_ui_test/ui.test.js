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

  test('Should display the correct title on the homepage', async () => {
    await page.waitForSelector('h1');
    const title = await page.$eval('h1', el => el.innerText);
    expect(title).toBe('GET THE ULTIMATE CYBERPUNK 2077 EXPERIENCE');
  });

  test('Should contain a navigation menu', async () => {
    const menuList = await page.$('.menu-list');
    expect(menuList).not.toBeNull();
  });

  test('Should contain menu items in the navigation menu', async () => {
    const menuItems = await page.$$('.menu-item');
    expect(menuItems).not.toBeNull();
  });
  
  test('Should contain a "Buy Now" button in the navigation menu', async () => {
    const buyNowBtn = await page.$('.menu-list .menu-item a[href*="buy"]');
    expect(buyNowBtn).not.toBeNull();
  });

  test('The "Buy Now" button should have the correct text', async () => {
    const buyNowBtnText = await page.$eval('.menu-list .menu-item a[href*="buy"]', el => el.innerText);
    expect(buyNowBtnText).toBe("BUY NOW");
  });

});