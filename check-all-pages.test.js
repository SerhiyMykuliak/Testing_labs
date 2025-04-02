import puppeteer from 'puppeteer';
import axios from 'axios';

describe('CYBERPUNK 77 Web-Site API and Puppeteer Tests', () => {
  let browser;
  let page;
  const BASE_URL = 'https://www.cyberpunk.net/ua/en/';
  let response;

  beforeAll(async () => {
    // Отримуємо HTML сторінки через axios
    response = await axios.get(BASE_URL);
    // Запускаємо Puppeteer
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Should contain links on the home page', async () => {
    // Отримуємо посилання на сторінці через Puppeteer
    await page.goto(BASE_URL);
    
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(anchor => anchor.href);
    });

    // Зберігаємо лише ті посилання, які містять 'https://www.cyberpunk.net/'
    const filteredLinks = links.filter(link => link.includes('https://www.cyberpunk.net/'));
    console.log('All links found on the home page: ', filteredLinks);
    // Перевірка наявності хоча б одного посилання, яке відповідає умові
    expect(filteredLinks.length).toBeGreaterThan(0);
  });

  test('Should return status 200', async () => {
    // Перевірка статусу 200 за допомогою axios
    expect(response.status).toBe(200);
  });

  test('Should return defined body', async () => {
    // Перевірка, що тіло відповіді визначене
    expect(response.data).toBeDefined();
  });

  test('Response time should be less than 1500ms', async () => {
    // Перевірка часу відповіді через axios
    const start = Date.now();
    await axios.get(BASE_URL);
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1500);
  });
});
