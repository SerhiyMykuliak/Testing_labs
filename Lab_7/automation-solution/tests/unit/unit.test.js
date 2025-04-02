import puppeteer from "puppeteer";
import { getElementAttribute } from "../../helpers/test_helper";

describe('getElementAttribute function for img element', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setContent(`
      <div>
        <img id="test-img" class="test-class" src="https://example.com/image.jpg" alt="Test Image">
      </div>
    `);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should return the correct class attribute', async () => {
    const result = await getElementAttribute(page, '#test-img', 'class');
    expect(result).toBe('test-class');
  });

  test('should return the correct src attribute', async () => {
    const result = await getElementAttribute(page, '#test-img', 'src');
    expect(result).toBe('https://example.com/image.jpg');
  });

  test('should return the correct alt attribute', async () => {
    const result = await getElementAttribute(page, '#test-img', 'alt');
    expect(result).toBe('Test Image');
  });

  test('should return null if the attribute does not exist', async () => {
    const result = await getElementAttribute(page, '#test-img', 'title');
    expect(result).toBeNull();
  });

  test('should return an empty string if the attribute is empty', async () => {
    await page.setContent(`
      <div>
        <img id="test-img-empty" class="test-class" src="https://example.com/image.jpg" alt="">
      </div>
    `);
    const result = await getElementAttribute(page, '#test-img-empty', 'alt');
    expect(result).toBe('');
  });
});

