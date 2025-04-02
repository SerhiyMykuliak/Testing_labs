import puppeteer from "puppeteer";


describe('Cyberpunk 2077 E2E Tests', () =>{
  const PAGE_URL = 'https://www.cyberpunk.net/us/en';
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();

    await page.setViewport({
      width: 1300,  
      height: 800  
    });

    await page.goto(PAGE_URL);
    await page.click('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
  });

  afterAll(async () =>{
    await browser.close()
  });

  test('User can change language', async () => {
    // Відкриваємо випадаючий список мов
    const languageListDropdown = await page.waitForSelector('.menu-item-lang');
    await languageListDropdown.click();

    // Чекаємо, поки з'явиться список мов
    const languageList = await page.$$('.menu-item-lang ul li');
    
    // Вибираємо мову
    await languageList[5].click();
    await page.waitForNavigation();

    // Перевіряємо, чи змінилося посилання сайту
    const pageUrl = page.url();
    expect(pageUrl).toContain('/fr/');
  });


  test('User can navigate to Buy page, select platform, and redirect to store', async () => {
    /* Натиснення на кнопку купівлі */
    const buyNowBtn = '.menu-list .menu-item a[href*="buy"]';
    await page.waitForSelector(buyNowBtn);
    await page.click(buyNowBtn);

    /* Перехід на сторінку купівлі */
    const buyPageUrl = await page.url();
    expect(buyPageUrl).toContain('/buy');

    /* Вибір обцій купівлі та перехід в магазин для завершення купівлі*/
    await page.waitForSelector('button[data-platform]');
    const gamePlatforms = await page.$$('button[data-platform]');
    await gamePlatforms[2].click();

    const gameStores = await page.$$('.info__box .shop a');
    const [newPage] = await Promise.all([
      browser.waitForTarget(target => target.url().includes('store.steampowered.com')),
      gameStores[2].click(),
    ]);

    /* Перевірка на правильність відкритої сторінки */
    expect(newPage.url()).toContain('https://store.steampowered.com/agecheck/bundle/32470');
  });

  test('User can navigate to trailer on Youtube', async () => {
    /* Створення нової вкладки */
    const newTab = await browser.newPage();
    await newTab.goto(PAGE_URL);
    await newTab.setViewport({ width: 1300, height: 800 });

    /* Пошук кнопки для переходу до трейлера */
    const trailerBtn = await newTab.$('a[href*="https://cp2077.ly/CP2077_UE_Trailer"]')
    
    /* Натиснення та перехід до трейлера */
    const [newPage] = await Promise.all([
      browser.waitForTarget(target => target.url().includes('youtube.com')),
      trailerBtn.click(),
    ]);

    /* Перевірка на правильність відкритого відео */
    expect(newPage.url()).toContain('watch?v=Ugb80d5lxEM');
  });

});